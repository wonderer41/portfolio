export type MetaCell = {
  key: string;
  value: string;
  /** Render as mono/code style (citron). */
  code?: boolean;
  /** Optional italic emphasis inside the value, rendered as <em>. */
  emphasis?: string;
};

export const topbar = {
  left: "FOLIO № 01 · BLUEPRINT",
  mid: "— Tasting Menu —",
  right: "REV. 0.3 · 21 / 05 / 2026",
};

export const heroMeta: MetaCell[] = [
  { key: "Course", value: "B.S.", emphasis: "Software Engineering" },
  { key: "Class of", value: "2027", code: true },
  { key: "Currently building", value: "Bonanza" },
  { key: "Status", value: "// OPEN", code: true },
];

export const bio = {
  leadBefore: "Software engineering student at Ensign, former chef from ",
  leadEm: "Le Cordon Bleu",
  tail:
    ". I build full-stack interfaces, back-ends, and the homelab that runs most of what I use day-to-day.",
};

export const tagline = "things made in the open";

export const footnote = {
  left: "GERARDO LAZO · BLUEPRINT v0.3",
  mid: "— pcb rev. B —",
  right: "SCROLL · 03 / 03",
};
