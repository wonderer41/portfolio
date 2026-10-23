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
    when: "Apr 2026 — present",
    role: "sole developer",
    titleTop: "Bonanza",
    titleBottom: "Transportation.",
    sub: "— full-stack booking platform.",
    tldr:
      "An end-to-end online booking platform for a premium transportation service. Built solo, from database schema and a rule-based pricing engine through payments, real-time route pricing, and automated SMS confirmations.",
    body: [
      "Architected the whole system from zero: Postgres schema, a rule-based fare + hourly pricing engine, a conflict-free scheduling model (per-vehicle timelines, buffers, atomic rebooking), Stripe payments, and SMS/email confirmations. Started with the boring docs (System Design, ERD, service-layer class diagram, MVP use cases) so the build itself stayed tightly scoped.",
      "Configured a real engineering workflow on top, GitHub Org with branch protection, Vercel CI/CD, custom domain on Google Workspace, because shipping a one-person project should still look like a team made it.",
    ],
    chips: [
      { label: "Next.js 16", hot: true },
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
    when: "Jun — Nov 2025",
    role: "co-developer",
    titleTop: "Project",
    titleBottom: "Zenith.",
    sub: "— AI streaming plugin for Jellyfin.",
    tldr:
      "An AI-curated live channel for a self-hosted Jellyfin library, scheduling an on-demand children's catalog into one continuous, automatically programmed stream.",
    body: [
      "Co-built a plugin that turns an on-demand Jellyfin library into a continuous, AI-curated live channel for children's content. I owned the backend: a Python/FastAPI service that the C# plugin talks to over REST.",
      "The integration gap nobody had solved: Jellyfin couldn't natively serve the AI-scheduled stream. I engineered server-side video streaming straight from FastAPI to close it. All inference runs locally through Ollama,  no external API in the loop.",
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
    mod: "MOD · 03",
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
  num: "04.",
  name: { plain: "—", em: "more soon" },
  meta: "draft",
};
