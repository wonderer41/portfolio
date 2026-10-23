"use client";

import { useEffect, useRef, useState } from "react";
import { PCBGrid } from "@/components/pcb/PCBGrid";
import { PCBTraces } from "@/components/pcb/PCBTraces";
import { ProjectModule } from "./ProjectModule";
import { projects, indexDraft } from "@/content/projects";

export function SelectedWorks() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const count = projects.length;

  const cards = () =>
    scrollRef.current
      ? Array.from(
          scrollRef.current.querySelectorAll<HTMLElement>(":scope > .module"),
        )
      : [];

  const goTo = (idx: number) => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    const target = cards()[idx];
    if (!target) return;
    scroll.scrollTo({
      left: target.offsetLeft - scroll.offsetLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    const onScroll = () => {
      const els = cards();
      if (els.length === 0) return;
      const step = els[1] ? els[1].offsetLeft - els[0].offsetLeft : scroll.clientWidth;
      const i = Math.max(
        0,
        Math.min(els.length - 1, Math.round((scroll.scrollLeft + 1) / step)),
      );
      setActive(i);
    };
    scroll.addEventListener("scroll", onScroll, { passive: true });
    // sync once
    onScroll();
    return () => scroll.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="screen applied-screen" data-screen-label="02 Applied">
      <PCBGrid />
      <PCBTraces section="works" />

      <div className="applied">
        <div className="section-head">
          <div className="menu-label">— Selected Works —</div>
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
            02 / system applied
          </div>
        </div>

        <div className="modules">
          {/* LEFT: card carousel */}
          <div className="cards-wrap">
            <div className="cards-meta">
              <span>
                <span className="now-card">
                  {String(active + 1).padStart(2, "0")}
                </span>{" "}
                / {String(count).padStart(2, "0")} · scroll →
              </span>
              <div className="cards-nav">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => goTo(active - 1)}
                  disabled={active === 0}
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => goTo(active + 1)}
                  disabled={active === count - 1}
                >
                  →
                </button>
              </div>
            </div>

            <div className="cards-scroll" ref={scrollRef}>
              {projects.map((p) => (
                <ProjectModule key={p.mod} project={p} />
              ))}
            </div>
          </div>

          {/* RIGHT: Index */}
          <article className="module index">
            <div className="silkscreen" />
            <div className="ic-pins left" />
            <div className="ic-pins right" />
            <div className="corner-pad" />

            <div className="index-title">Index — vol. 01</div>
            <ol>
              {projects.map((p, idx) => (
                <li
                  key={p.mod}
                  data-idx={idx}
                  className={active === idx ? "active" : undefined}
                  onClick={() => goTo(idx)}
                >
                  <span className="li-pad pad-node" />
                  <span className="li-num">
                    {String(idx + 1).padStart(2, "0")}.
                  </span>
                  <span className="li-name">
                    {p.indexName.plain} <em>{p.indexName.em}</em>
                  </span>
                  <span className="li-meta">{p.indexMeta}</span>
                </li>
              ))}
              <li>
                <span className="li-pad pad-node" />
                <span className="li-num">{indexDraft.num}</span>
                <span className="li-name">
                  {indexDraft.name.plain} <em>{indexDraft.name.em}</em>
                </span>
                <span className="li-meta">{indexDraft.meta}</span>
              </li>
            </ol>
          </article>
        </div>
      </div>
    </section>
  );
}
