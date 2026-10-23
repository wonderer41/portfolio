type Section = "hero" | "works" | "contact";

const VIEWBOX: Record<Section, string> = {
  hero: "0 0 1920 1080",
  works: "0 0 1920 1100",
  contact: "0 0 1920 1000",
};

const PULSE_ID: Record<Section, string> = {
  hero: "pulse-layer",
  works: "pulse-layer-2",
  contact: "pulse-layer-3",
};

/**
 * Per-section PCB trace network. Static SVG; the pulse overlay sibling is
 * populated at runtime by usePCBAnimation.
 */
export function PCBTraces({ section }: { section: Section }) {
  return (
    <>
      <svg
        className="pcb"
        data-pcb={section}
        viewBox={VIEWBOX[section]}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {section === "hero" && <HeroPaths />}
        {section === "works" && <WorksPaths />}
        {section === "contact" && <ContactPaths />}
      </svg>
      <svg
        className="pcb"
        id={PULSE_ID[section]}
        viewBox={VIEWBOX[section]}
        preserveAspectRatio="none"
        aria-hidden="true"
      />
    </>
  );
}

function HeroPaths() {
  return (
    <>
      {/* TOP-LEFT CLUSTER */}
      <path className="trace t1" d="M -20 70 L 80 70 L 110 100 L 110 200 L 90 220 L 90 320 L 120 350 L 120 460" />
      <path className="trace t2" d="M 60 -20 L 60 120 L 130 190 L 270 190 L 300 160 L 460 160 L 490 190 L 600 190" />
      <path className="trace t3" d="M -20 280 L 50 280 L 80 310 L 80 400 L 110 430 L 280 430" />
      {/* TOP-RIGHT CLUSTER */}
      <path className="trace t4" d="M 1940 70 L 1840 70 L 1810 100 L 1810 200 L 1830 220 L 1830 320 L 1800 350 L 1800 460" />
      <path className="trace t5" d="M 1860 -20 L 1860 120 L 1790 190 L 1650 190 L 1620 160 L 1460 160 L 1430 190 L 1320 190" />
      <path className="trace t6" d="M 1940 280 L 1870 280 L 1840 310 L 1840 400 L 1810 430 L 1640 430" />
      {/* BOTTOM-LEFT CLUSTER */}
      <path className="trace t7" d="M -20 1010 L 80 1010 L 110 980 L 110 880 L 90 860 L 90 760 L 120 730 L 120 620" />
      <path className="trace t8" d="M 60 1100 L 60 960 L 130 890 L 270 890 L 300 920 L 460 920 L 490 890 L 600 890" />
      <path className="trace t9" d="M -20 800 L 50 800 L 80 770 L 80 680 L 110 650 L 280 650" />
      {/* BOTTOM-RIGHT CLUSTER */}
      <path className="trace t10" d="M 1940 1010 L 1840 1010 L 1810 980 L 1810 880 L 1830 860 L 1830 760 L 1800 730 L 1800 620" />
      <path className="trace t11" d="M 1860 1100 L 1860 960 L 1790 890 L 1650 890 L 1620 920 L 1460 920 L 1430 890 L 1320 890" />
      <path className="trace t12" d="M 1940 800 L 1870 800 L 1840 770 L 1840 680 L 1810 650 L 1640 650" />
      {/* INNER LEFT */}
      <path className="trace t13" d="M 280 540 L 380 540 L 410 570 L 540 570" />
      <path className="trace t14" d="M 280 600 L 350 600 L 380 630 L 480 630" />
      {/* INNER RIGHT */}
      <path className="trace t15" d="M 1640 540 L 1540 540 L 1510 570 L 1380 570" />
      <path className="trace t16" d="M 1640 600 L 1570 600 L 1540 630 L 1440 630" />

      <g id="pads">
        <circle className="pad p" cx="110" cy="460" r="3.5" />
        <circle className="pad p" cx="600" cy="190" r="3.5" />
        <circle className="pad p" cx="280" cy="430" r="3.5" />
        <circle className="pad p" cx="1810" cy="460" r="3.5" />
        <circle className="pad p" cx="1320" cy="190" r="3.5" />
        <circle className="pad p" cx="1640" cy="430" r="3.5" />
        <circle className="pad p" cx="120" cy="620" r="3.5" />
        <circle className="pad p" cx="600" cy="890" r="3.5" />
        <circle className="pad p" cx="280" cy="650" r="3.5" />
        <circle className="pad p" cx="1800" cy="620" r="3.5" />
        <circle className="pad p" cx="1320" cy="890" r="3.5" />
        <circle className="pad p" cx="1640" cy="650" r="3.5" />
        <circle className="pad pad-warm p" cx="540" cy="570" r="3" />
        <circle className="pad pad-warm p" cx="480" cy="630" r="3" />
        <circle className="pad pad-warm p" cx="1380" cy="570" r="3" />
        <circle className="pad pad-warm p" cx="1440" cy="630" r="3" />
        <circle className="pad-outline" cx="110" cy="200" r="5" />
        <circle className="pad-outline" cx="90" cy="320" r="5" />
        <circle className="pad-outline" cx="1810" cy="200" r="5" />
        <circle className="pad-outline" cx="1830" cy="320" r="5" />
        <circle className="pad-outline" cx="110" cy="880" r="5" />
        <circle className="pad-outline" cx="1810" cy="880" r="5" />
      </g>

      <text className="annot" x="612" y="186">VCC.01</text>
      <text className="annot citron" x="292" y="426">GND</text>
      <text className="annot" x="1300" y="186" textAnchor="end">DAT.02</text>
      <text className="annot" x="1652" y="426">CLK</text>
      <text className="annot" x="612" y="886">RX/TX</text>
      <text className="annot citron" x="552" y="566">accent</text>
      <text className="annot citron" x="1372" y="566" textAnchor="end">accent</text>
    </>
  );
}

function WorksPaths() {
  return (
    <>
      <path className="trace" d="M -20 80 L 60 80 L 90 110 L 90 220" />
      <path className="trace" d="M -20 320 L 80 320 L 110 350 L 110 440" />
      <path className="trace" d="M -20 640 L 80 640 L 110 610 L 110 520" />
      <path className="trace" d="M -20 1020 L 60 1020 L 90 990 L 90 880" />
      <path className="trace" d="M 1940 80 L 1860 80 L 1830 110 L 1830 220" />
      <path className="trace" d="M 1940 320 L 1840 320 L 1810 350 L 1810 440" />
      <path className="trace" d="M 1940 640 L 1840 640 L 1810 610 L 1810 520" />
      <path className="trace" d="M 1940 1020 L 1860 1020 L 1830 990 L 1830 880" />
      <circle className="pad p-a" cx="90" cy="220" r="3.5" />
      <circle className="pad p-a" cx="110" cy="440" r="3.5" />
      <circle className="pad pad-warm p-a" cx="110" cy="520" r="3" />
      <circle className="pad p-a" cx="90" cy="880" r="3.5" />
      <circle className="pad p-a" cx="1830" cy="220" r="3.5" />
      <circle className="pad p-a" cx="1810" cy="440" r="3.5" />
      <circle className="pad pad-warm p-a" cx="1810" cy="520" r="3" />
      <circle className="pad p-a" cx="1830" cy="880" r="3.5" />
    </>
  );
}

function ContactPaths() {
  return (
    <>
      {/* Incoming context traces (left) */}
      <path className="trace t-c1" d="M -20 140 L 120 140 L 150 110 L 240 110 L 270 140 L 310 140" />
      <path className="trace t-c2" d="M -20 280 L 90 280 L 120 310 L 200 310 L 230 280 L 280 280" />
      <path className="trace t-c3" d="M -20 460 L 80 460 L 110 430 L 220 430 L 250 460 L 300 460" />
      <path className="trace t-c4" d="M -20 640 L 100 640 L 130 670 L 220 670 L 250 640 L 280 640" />
      <path className="trace t-c5" d="M -20 820 L 60 820 L 90 790 L 200 790 L 230 820 L 280 820" />
      {/* Outgoing TX branches */}
      <path className="trace t-tx2" d="M 1080 720 L 1180 720 L 1210 690 L 1320 690 L 1350 720 L 1500 720" />
      <path className="trace t-tx3" d="M 1080 820 L 1200 820 L 1230 850 L 1380 850 L 1410 820 L 1560 820 L 1590 790 L 1700 790" />
      <path className="trace t-tx4" d="M 1080 920 L 1180 920 L 1210 890 L 1340 890 L 1370 920 L 1500 920" />
      {/* TX MAIN ARTERY */}
      <path
        className="trace tx-trace"
        id="tx-trace"
        d="M 1080 620 L 1240 620 L 1270 590 L 1420 590 L 1450 560 L 1620 560 L 1650 590 L 1820 590 L 1850 620 L 1940 620"
      />

      <g className="tx-pads">
        <circle className="pad p-c" cx="310" cy="140" r="3.5" />
        <circle className="pad p-c" cx="280" cy="280" r="3.5" />
        <circle className="pad pad-warm p-c" cx="300" cy="460" r="3" />
        <circle className="pad p-c" cx="280" cy="640" r="3.5" />
        <circle className="pad p-c" cx="280" cy="820" r="3.5" />
        <circle className="pad p-c" cx="1500" cy="720" r="3.5" />
        <circle className="pad p-c" cx="1700" cy="790" r="3.5" />
        <circle className="pad p-c" cx="1500" cy="920" r="3.5" />
        <circle className="pad tx-pad" id="tx-pad" cx="1920" cy="620" r="7" />
        <circle className="pad-outline" cx="1920" cy="620" r="14" />
        <circle className="pad-outline" cx="1920" cy="620" r="22" />
      </g>
      <text className="annot citron" x="1890" y="598" textAnchor="end">TX.OUT</text>
    </>
  );
}
