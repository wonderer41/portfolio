export type Channel = {
  key: string;
  value: string;
  href?: string;
};

export const channels: Channel[] = [
  { key: "EMAIL", value: "gerardarones@proton.me", href: "mailto:gerardarones@proton.me" },
  {
    key: "LINKEDIN",
    value: "/in/gerardarones",
    href: "https://www.linkedin.com/in/gerardarones",
  },
  {
    key: "GITHUB",
    value: "github.com/wonderer41",
    href: "https://github.com/wonderer41",
  },
];

export const intro =
  "For hiring, collaboration, or simply saying hello. I read everything; I reply to most.";
