"use client";

import anime from "animejs";

export type Pulse = { el: SVGPathElement; len: number };

/**
 * For each `.trace` under `pcbSelector`, append a duplicate `<path class="pulse">`
 * into the pulse overlay layer at `pulseLayerId`. Returns the created pulse paths
 * so the caller can animate them.
 */
export function buildPulses(
  pcbSelector: string,
  pulseLayerId: string,
): Pulse[] {
  const layer = document.getElementById(pulseLayerId);
  if (!layer) return [];
  const traces = document.querySelectorAll<SVGPathElement>(
    `${pcbSelector} .trace`,
  );
  // Clear any previous pulses (re-mount safety).
  while (layer.firstChild) layer.removeChild(layer.firstChild);

  const ns = "http://www.w3.org/2000/svg";
  const pulses: Pulse[] = [];
  traces.forEach((tr) => {
    const d = tr.getAttribute("d");
    if (!d) return;
    const p = document.createElementNS(ns, "path") as SVGPathElement;
    p.setAttribute("d", d);
    p.setAttribute("class", "pulse");
    p.style.opacity = "0";
    layer.appendChild(p);
    const len = p.getTotalLength();
    p.style.strokeDasharray = `${Math.min(80, len * 0.18)} ${len}`;
    p.style.strokeDashoffset = String(len);
    pulses.push({ el: p, len });
  });
  return pulses;
}

/**
 * Continuous "signal traveling" effect on each pulse path. Loops forever.
 */
export function startPulses(pulses: Pulse[], baseDelay = 0) {
  pulses.forEach((p, i) => {
    p.el.style.opacity = "0";
    anime({
      targets: p.el,
      opacity: [0, 0.95, 0.95, 0],
      strokeDashoffset: [p.len, -p.len * 0.18],
      duration: 3200 + (i % 4) * 400,
      delay: baseDelay + i * 180 + Math.random() * 600,
      easing: "easeInOutSine",
      loop: true,
    });
  });
}
