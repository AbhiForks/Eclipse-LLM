/**
 * GlowOrbs.tsx
 *
 * Interactive floating orbs with mouse tracking.
 * Creates dynamic lighting effects across the interface.
 * Monochrome design for Eclipse.
 *
 * Built by Abhilash V
 */

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import type { FC } from "react";

interface GlowOrbsProps {
  mouseX?: number;
  mouseY?: number;
}

const GlowOrbs: FC<GlowOrbsProps> = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 50, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #F2EDED 0%, transparent 70%)",
          x: useTransform(x, (value) => value - 250),
          y: useTransform(y, (value) => value - 250),
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]"
        style={{
          background: "radial-gradient(circle, #B8B2B2 0%, transparent 70%)",
          x: useTransform(x, (value) => 800 - value - 200),
          y: useTransform(y, (value) => value - 200),
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full opacity-12 blur-[70px]"
        style={{
          background: "radial-gradient(circle, #F2EDED 0%, transparent 70%)",
          x: useTransform(x, (value) => value * 0.5 - 175),
          y: useTransform(y, (value) => 600 - value - 175),
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-10 blur-[60px]"
        style={{
          background: "radial-gradient(circle, #B8B2B2 0%, transparent 70%)",
          x: useTransform(x, (value) => value * 1.2 - 150),
          y: useTransform(y, (value) => value * 1.2 - 150),
        }}
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      <motion.div
        className="absolute w-[280px] h-[280px] rounded-full opacity-10 blur-[55px]"
        style={{
          background: "radial-gradient(circle, #F2EDED 0%, transparent 70%)",
          x: useTransform(x, (value) => 1000 - value - 140),
          y: useTransform(y, (value) => 200 - value - 140),
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  );
};

export default GlowOrbs;
