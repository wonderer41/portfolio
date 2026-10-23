import type { Project } from "@/content/projects";

export function ProjectModule({ project }: { project: Project }) {
  return (
    <article className="module">
      <div className="silkscreen" />
      <div className="ic-pins left" />
      <div className="ic-pins right" />
      <div className="corner-pad" />

      <div className="module-grid">
        <header className="module-left">
          <div className="module-id">
            <span className="idx">{project.mod}</span>
            <span className="when">{project.when}</span>
            <span className="when">{project.role}</span>
          </div>
          <h3>
            {project.titleTop}
            <br />
            <em>{project.titleBottom}</em>
          </h3>
          <p className="module-sub">{project.sub}</p>
          <div className="stack-row">
            {project.chips.map((chip) => (
              <span
                key={chip.label}
                className={`chip${chip.hot ? " hot" : ""}`}
              >
                {chip.label}
              </span>
            ))}
          </div>
        </header>
        <div className="module-right">
          <p className="tldr">{project.tldr}</p>
          {project.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
