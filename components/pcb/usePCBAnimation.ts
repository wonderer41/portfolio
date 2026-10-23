"use client";

import { useEffect } from "react";
import anime from "animejs";
import { buildPulses, startPulses } from "@/lib/usePulses";

/** One-time trace draw-in for every `.trace` in the document. */
function drawInAllTraces() {
  const traces = document.querySelectorAll<SVGPathElement>(".pcb .trace");
  traces.forEach((t) => {
    const len = t.getTotalLength();
    t.style.strokeDasharray = String(len);
    t.style.strokeDashoffset = String(len);
    t.style.opacity = "1";
  });
  return anime({
    targets: traces as unknown as SVGPathElement[],
    strokeDashoffset: [(el: SVGPathElement) => el.getTotalLength(), 0],
    duration: 1800,
    delay: anime.stagger(80, { from: "center" }),
    easing: "easeInOutQuart",
  });
}

/** Soft breathing pulse on a group of `<circle class="pad">` nodes. */
function pulsePads(selector: string) {
  anime({
    targets: selector,
    r: [
      (el: SVGCircleElement) => +(el.getAttribute("r") ?? "3"),
      (el: SVGCircleElement) => +(el.getAttribute("r") ?? "3") * 1.6,
      (el: SVGCircleElement) => +(el.getAttribute("r") ?? "3"),
    ],
    opacity: [0.7, 1, 0.7],
    duration: 2400,
    // anime.js v3 supports "random" but @types/animejs omits it.
    delay: anime.stagger(140, { from: "random" as unknown as "center" }),
    easing: "easeInOutSine",
    loop: true,
    direction: "alternate",
  });
}

/** Cycle the little pad dots on the Index sidebar. */
function cascadeIndex() {
  const pads = document.querySelectorAll<HTMLElement>(".li-pad");
  pads.forEach((p) => {
    p.style.opacity = "0.2";
  });
  anime({
    targets: ".li-pad",
    opacity: [0.2, 1, 0.2],
    scale: [0.8, 1.6, 0.8],
    duration: 1600,
    delay: anime.stagger(220),
    easing: "easeInOutSine",
    loop: true,
  });
}

/**
 * Bootstraps every PCB animation on mount:
 *  1. trace draw-in (centered stagger)
 *  2. continuous signal pulses (per section, with staggered base delays)
 *  3. pad breathing (per section)
 *  4. index sidebar cascade
 *  5. TX antenna slow breathe
 */
export function usePCBAnimation() {
  useEffect(() => {
    // Safety: clear any prior running animations (StrictMode double-mount in dev).
    anime.remove(".pcb .trace");
    anime.remove(".pcb .pad");
    anime.remove(".li-pad");
    anime.remove("#tx-pad");

    drawInAllTraces();

    const heroPulses = buildPulses('[data-pcb="hero"]', "pulse-layer");
    startPulses(heroPulses, 1800);
    pulsePads("#pads .pad");

    const worksPulses = buildPulses('[data-pcb="works"]', "pulse-layer-2");
    startPulses(worksPulses, 800);
    pulsePads(".p-a");

    const contactPulses = buildPulses(
      '[data-pcb="contact"]',
      "pulse-layer-3",
    );
    startPulses(contactPulses, 1200);
    pulsePads(".p-c");

    cascadeIndex();

    anime({
      targets: "#tx-pad",
      r: [7, 10, 7],
      opacity: [0.7, 1, 0.7],
      duration: 2200,
      easing: "easeInOutSine",
      loop: true,
    });
  }, []);
}
