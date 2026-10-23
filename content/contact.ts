export type Channel = {
  key: string;
  value: string;
  href?: string;
};

export const mailTarget = "ggl746@ensign.edu";

export const channels: Channel[] = [
  { key: "EMAIL", value: "gglazoarones@gmail.com", href: "mailto:gglazoarones@gmail.com" },
  {
    key: "LINKEDIN",
    value: "/in/arones-41-gerardo",
    href: "https://www.linkedin.com/in/arones-41-gerardo",
  },
  {
    key: "GITHUB",
    value: "github.com/wonderer41",
    href: "https://github.com/wonderer41",
  },
];

export const intro =
  "For hiring, collaboration, or simply saying hello. I read everything; I reply to most.";
