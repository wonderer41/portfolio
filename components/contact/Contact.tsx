import { PCBGrid } from "@/components/pcb/PCBGrid";
import { PCBTraces } from "@/components/pcb/PCBTraces";
import { channels, intro } from "@/content/contact";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section
      className="screen contact-section"
      data-screen-label="03 Contact"
    >
      <PCBGrid />
      <PCBTraces section="contact" />

      <div className="contact-wrap">
        <div className="section-head">
          <div className="menu-label">— Open a Channel —</div>
          <div className="rule" />
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "var(--vellum-faint)",
              textTransform: "uppercase",
            }}
          >
            03 / transmit
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-intro">
            <h2>
              Send a<br />
              <em>transmission.</em>
            </h2>
            <p>{intro}</p>
            <ul className="contact-channels">
              {channels.map((c) => (
                <li key={c.key}>
                  <span className="k">{c.key}</span>
                  <span>
                    {c.href ? <a href={c.href}>{c.value}</a> : c.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
