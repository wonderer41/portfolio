"use client";

import { usePCBAnimation } from "./usePCBAnimation";

/** Empty client component that wires up all PCB animations on mount. */
export function PCBAnimation() {
  usePCBAnimation();
  return null;
}
