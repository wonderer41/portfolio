"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";

type Status = { text: string; color: string } | null;

export function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const mountedAt = useRef<number>(0);
  const [status, setStatus] = useState<Status>(null);
  const [submitting, setSubmitting] = useState(false);

  // Record when the form became interactive — the API rejects submissions that
  // arrive faster than a human could fill it in (bot time-trap).
  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  const playTrace = () => {
    const tx = document.getElementById("tx-trace") as SVGPathElement | null;
    if (!tx) return;
    const len = tx.getTotalLength();
    tx.style.strokeDasharray = String(len);
    tx.style.strokeDashoffset = String(len);
    tx.style.stroke = "#e8f4ff";
    tx.style.strokeWidth = "2.2";
    tx.style.filter =
      "drop-shadow(0 0 6px #4af0ff) drop-shadow(0 0 14px rgba(74,240,255,0.5))";
    tx.style.opacity = "1";
    anime({
      targets: tx,
      strokeDashoffset: 0,
      duration: 1200,
      easing: "easeInOutQuad",
    });
  };

  const pulsePad = () => {
    const txPad = document.getElementById("tx-pad") as SVGCircleElement | null;
    if (!txPad) return;
    anime({
      targets: txPad,
      r: [7, 22, 9],
      opacity: [1, 0.4, 1],
      duration: 700,
      easing: "easeOutCubic",
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form || submitting) return;

    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      subject: String(fd.get("subject") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      company: String(fd.get("company") ?? ""), // honeypot
      elapsed: mountedAt.current ? performance.now() - mountedAt.current : 0,
    };

    setSubmitting(true);
    setStatus({ text: "→ routing…", color: "var(--pad)" });
    playTrace();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (res.ok && data.ok) {
        pulsePad();
        setStatus({
          text: "→ transmitted · Gerard will see it shortly",
          color: "var(--pad-warm)",
        });
        form.reset();
        mountedAt.current = performance.now();
      } else {
        setStatus({
          text: `→ ${data.error ?? "transmission failed · try again"}`,
          color: "#ff8f6b",
        });
      }
    } catch {
      setStatus({
        text: "→ network error · check your connection and retry",
        color: "#ff8f6b",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      className="contact-form"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="form-id">
        <span className="idx">TX · CHANNEL 01</span>
        <span>direct → inbox</span>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="f-name">Name</label>
          <input
            id="f-name"
            type="text"
            name="name"
            required
            placeholder="Who's transmitting?"
          />
        </div>
        <div className="field">
          <label htmlFor="f-email">From</label>
          <input
            id="f-email"
            type="email"
            name="email"
            required
            placeholder="you@somewhere.com"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-subj">Subject</label>
        <input
          id="f-subj"
          type="text"
          name="subject"
          placeholder="opportunity at acme · question · hello"
        />
      </div>
      <div className="field">
        <label htmlFor="f-body">Message</label>
        <textarea
          id="f-body"
          name="message"
          rows={5}
          placeholder="Tell me what you're working on."
        />
      </div>

      {/* Honeypot — hidden from humans, irresistible to bots. Server drops any
          submission where this is filled. */}
      <div aria-hidden="true" className="hp-field">
        <label htmlFor="f-company">Company</label>
        <input
          id="f-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button type="submit" className="tx-button" disabled={submitting}>
        <span>{submitting ? "Transmitting…" : "Transmit"}</span>
        <span className="arrow">→</span>
      </button>
      <div
        className="contact-status"
        style={status ? { color: status.color } : undefined}
      >
        {status?.text ?? ""}
      </div>
    </form>
  );
}
