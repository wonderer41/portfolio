import { NextRequest, NextResponse } from "next/server";

// Server-side route handler — runs on VM 103, never in the browser. It forwards
// the contact message to the n8n webhook on ubuntu-main over the private LAN
// (CONTACT_WEBHOOK_URL). The visitor's browser never sees that internal address.
//
// Not cached (POST). Node runtime (default) so module-level rate-limit state
// survives between requests — valid because this runs as one long-lived container.

// ── Tunables ────────────────────────────────────────────────────────────────
const MAX_PER_WINDOW = 5; // submissions allowed per IP per window
const WINDOW_MS = 10 * 60_000; // 10 minutes
const MIN_FILL_MS = 2_000; // a human takes longer than 2s to fill the form
const MAX_NAME = 100;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5_000;

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown; // honeypot — must stay empty
  elapsed?: unknown; // ms the form was on screen before submit
};

// ── Layer 3: in-memory per-IP rate limit (sliding window) ─────────────────────
// Map<ip, timestamps[]>. Fine for one container; swap for Redis if you scale out.
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: NextRequest): string {
  // Behind Traefik the real IP is in x-forwarded-for (first hop).
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: NextRequest) {
  const now = Date.now();
  const ip = clientIp(req);

  if (rateLimited(ip, now)) {
    return NextResponse.json(
      { ok: false, error: "Too many transmissions. Try again later." },
      { status: 429 },
    );
  }

  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  // ── Layer 1: honeypot. Real users never see/fill `company`. Silently 200 so
  // bots can't tell they were dropped. ──────────────────────────────────────
  if (str(data.company) !== "") {
    return NextResponse.json({ ok: true });
  }

  // ── Layer 2: time-trap. Submitted suspiciously fast → almost certainly a bot.
  const elapsed = typeof data.elapsed === "number" ? data.elapsed : 0;
  if (elapsed > 0 && elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true }); // silent drop, same as honeypot
  }

  // ── Validation ──────────────────────────────────────────────────────────────
  const name = str(data.name);
  const email = str(data.email);
  const subject = str(data.subject);
  const message = str(data.message);

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "A name is required." },
      { status: 422 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid return address is required." },
      { status: 422 },
    );
  }
  if (!message) {
    return NextResponse.json(
      { ok: false, error: "Message can't be empty." },
      { status: 422 },
    );
  }
  if (name.length > MAX_NAME || subject.length > MAX_SUBJECT || message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { ok: false, error: "Message is too long." },
      { status: 422 },
    );
  }

  // ── Forward to the n8n webhook ────────────────────────────────────────────────
  // Contract: { name, email, message } as JSON. n8n reads $json.body.{name,email,
  // message}. Subject is folded into message so it shows up in the notification
  // without needing an extra mapping in the workflow.
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) {
    console.error("CONTACT_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { ok: false, error: "Channel offline. Reach out directly for now." },
      { status: 503 },
    );
  }

  const composedMessage = subject ? `${subject}\n\n${message}` : message;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // Optional shared secret — check it in the n8n workflow's first node to
        // keep anything but this server from triggering the webhook. Unused if blank.
        ...(process.env.CONTACT_WEBHOOK_TOKEN
          ? { "x-contact-token": process.env.CONTACT_WEBHOOK_TOKEN }
          : {}),
      },
      body: JSON.stringify({ name, email, message: composedMessage }),
      // Don't let a slow/hung webhook hold the request open forever.
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error(`Webhook responded ${res.status}`);
      return NextResponse.json(
        { ok: false, error: "Couldn't deliver that. Try again shortly." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Failed to reach the webhook:", err);
    return NextResponse.json(
      { ok: false, error: "Couldn't reach the relay. Try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
