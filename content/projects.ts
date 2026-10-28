export type Chip = { label: string; hot?: boolean };

export type Project = {
  mod: string;
  when: string;
  role: string;
  titleTop: string;
  titleBottom: string;
  sub: string;
  tldr: string;
  body: string[];
  chips: Chip[];
  /** Index sidebar fields */
  indexName: { plain: string; em: string };
  indexMeta: string;
};

export const projects: Project[] = [
  {
    mod: "MOD · 01",
    when: "Jan — Jun 2026",
    role: "sole developer",
    titleTop: "Bonanza",
    titleBottom: "Transportation.",
    sub: "— full-stack booking platform.",
    tldr:
      "A production booking platform for a premium transportation service, built solo and shipped to a real client. I owned it end to end: system design, schema, payments, deployment, and maintenance after launch.",
    body: [
      "Architected the whole system from zero: Postgres schema, a rule-based pricing engine, Stripe Checkout + Stripe Tax payments, and real-time route pricing through the Google Routes API. Started with the boring docs (System Design, ERD, service-layer class diagram, MVP use cases) so the build itself stayed tightly scoped.",
      "After launch I kept shipping on the live app: rebooking, a cancellation flow, notification emails, and .ics calendar invites. All on a real engineering workflow (GitHub Org with branch protection, Vercel CI/CD, custom domain on Google Workspace), with Claude Code in the loop and every generated change reviewed before merging.",
    ],
    chips: [
      { label: "Next.js 15", hot: true },
      { label: "TypeScript" },
      { label: "Supabase" },
      { label: "Stripe" },
      { label: "Resend" },
      { label: "Google Routes API" },
      { label: "Vercel" },
    ],
    indexName: { plain: "Bonanza", em: "Transportation" },
    indexMeta: "'26 · TS",
  },
  {
    mod: "MOD · 02",
    when: "Oct 2026 — present",
    role: "sole developer",
    titleTop: "Daily",
    titleBottom: "Intake.",
    sub: "— a homelab daily dashboard.",
    tldr:
      "One page that tells me what my day looks like: calendar, commits, media requests, markets. Fed by a background worker, and with an AI agent that can write to it.",
    body: [
      "A background worker syncs Google Calendar, GitHub, Seerr, and stock APIs on schedules. A token-authenticated REST API lets an AI agent create cards, alerts, and notes, and every change streams to the page over server-sent events. New commits get an AI push-review, posted as progress on sprint items.",
      "Built like it matters: an IP allowlist, an allowed-hosts check, and CSRF protection on the server; 60+ unit tests behind CI gates; and one Docker image (app, worker, migrations) built and pushed to GHCR by GitHub Actions. Code is public at github.com/wonderer41/daily-intake.",
    ],
    chips: [
      { label: "Next.js 16", hot: true },
      { label: "React 19" },
      { label: "TypeScript" },
      { label: "Prisma 7" },
      { label: "PostgreSQL 17" },
      { label: "Docker" },
      { label: "GitHub Actions" },
    ],
    indexName: { plain: "Daily", em: "Intake" },
    indexMeta: "'26 · TS",
  },
  {
    mod: "MOD · 03",
    when: "Jun — Dec 2025",
    role: "backend · two-person team",
    titleTop: "Project",
    titleBottom: "Zenith.",
    sub: "— AI streaming plugin for Jellyfin.",
    tldr:
      "An AI-curated live channel for a self-hosted Jellyfin library, scheduling an on-demand children's catalog into one continuous, automatically programmed stream.",
    body: [
      "Co-built a plugin that turns an on-demand Jellyfin library into a continuous, AI-curated live channel for children's content, working in agile iterations with peer code review. I owned the backend: a Python/FastAPI REST API that the C# plugin consumes.",
      "The integration gap nobody had solved: Jellyfin couldn't natively serve the AI-scheduled stream. I engineered server-side video streaming straight from FastAPI to close it. All inference runs locally through Ollama, no external API in the loop.",
    ],
    chips: [
      { label: "Python", hot: true },
      { label: "FastAPI" },
      { label: "REST" },
      { label: "C# / .NET" },
      { label: "Ollama" },
    ],
    indexName: { plain: "Project", em: "Zenith" },
    indexMeta: "'25 · PY",
  },
  {
    mod: "MOD · 04",
    when: "ongoing",
    role: "personal infra",
    titleTop: "The",
    titleBottom: "Homelab.",
    sub: "— a hobby teaching me production Linux.",
    tldr:
      "A self-hosted infrastructure stack: a Proxmox host running 20+ containerized services, with networking, storage, and secure remote access managed end to end.",
    body: [
      "A hardlink-based media pipeline built around the *arr stack: Sonarr, Radarr, Lidarr, and Prowlarr feed qBittorrent (routed through Gluetun + ProtonVPN), while Bazarr, Shoko, and Cleanuparr handle subtitles, anime metadata, and orphan cleanup before Jellyfin and Plex serve the library.",
      "It spans several Proxmox VMs: NetBird provides self-hosted mesh VPN, Nginx Proxy Manager and Traefik terminate TLS for internal and public services, and TrueNAS serves storage over NFS. A passed-through RTX 3090 runs local LLMs through Ollama — backing two self-hosted AI Discord assistants and n8n automations. Breaking and fixing GPU passthrough, NFS under load, and the occasional OOM'd VM has taught me more production Linux than any course.",
    ],
    chips: [
      { label: "Proxmox", hot: true },
      { label: "Docker" },
      { label: "Linux · Fedora" },
      { label: "Nginx" },
      { label: "WireGuard" },
      { label: "NetBird" },
    ],
    indexName: { plain: "The", em: "Homelab" },
    indexMeta: "ongoing",
  },
];

export const indexDraft = {
  num: "05.",
  name: { plain: "—", em: "more soon" },
  meta: "draft",
};
