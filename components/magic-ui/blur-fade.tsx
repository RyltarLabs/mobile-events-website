"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type BlurFadeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
};

export function BlurFade({
  children,
  className,
  delay = 0,
  yOffset = 18,
}: BlurFadeProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
