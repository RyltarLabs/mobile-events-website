"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { ReactNode } from "react";

type SpotlightFrameProps = {
  children: ReactNode;
  className?: string;
};

export function SpotlightFrame({ children, className }: SpotlightFrameProps) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  return (
    <motion.div
      className={className}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(((event.clientX - rect.left) / rect.width) * 100);
        mouseY.set(((event.clientY - rect.top) / rect.height) * 100);
      }}
      style={{
        background: useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(255,255,255,.24), transparent 34%), linear-gradient(135deg, rgba(246,241,232,.55), rgba(255,255,255,.04))`,
      }}
    >
      {children}
    </motion.div>
  );
}
