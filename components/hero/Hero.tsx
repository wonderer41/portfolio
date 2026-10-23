import { PCBGrid } from "@/components/pcb/PCBGrid";
import { PCBTraces } from "@/components/pcb/PCBTraces";
import { NameLockup } from "./NameLockup";
import { MetaRow } from "./MetaRow";
import { bio, tagline, topbar } from "@/content/meta";

export function Hero() {
  return (
    <section className="screen" data-screen-label="01 Hero">
      <PCBGrid />

      <div className="binary b1">{`01101000 01100101 01101100
01101100 01101111 00100000
01110111 01101111 01110010
01101100 01100100`}</div>
      <div className="binary b2">{`0xF1EA · 0xD200
0x4A40 · 0xF0FF
0xD7C7 · 0x4200`}</div>
      <div className="binary b3">{`// trace.alpha = 0.45
// pulse.duration = 4200
// pad.glow = on`}</div>

      <PCBTraces section="hero" />

      <div className="hero">
        <div className="topbar">
          <div className="left">
            <span className="dot" />
            {topbar.left}
          </div>
          <div className="mid">{topbar.mid}</div>
          <div className="right">{topbar.right}</div>
        </div>

        <div className="center">
          <div className="menu-label">Software · Engineering · Folio</div>
          <NameLockup />
          <div className="menu-sub" style={{ marginTop: 24 }}>
            a tasting menu of <em>{tagline}</em>
          </div>
          <p className="tag">
            {bio.leadBefore}
            <em>{bio.leadEm}</em>
            {bio.tail}
          </p>
        </div>

        <MetaRow />
      </div>
    </section>
  );
}
