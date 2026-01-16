/**
 * AuroraBackground.tsx
 *
 * Stunning aurora borealis-inspired animated background.
 * Pure CSS animation with zero JavaScript overhead.
 * Monochrome design for Eclipse.
 *
 * Built by Abhilash V
 */

import { motion } from "framer-motion";
import type { FC } from "react";

const AuroraBackground: FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#000000]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#050505] to-[#000000]" />

      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 20% 40%, #F2EDED 0%, transparent 50%),
                       radial-gradient(ellipse 60% 40% at 70% 20%, #B8B2B2 0%, transparent 50%),
                       radial-gradient(ellipse 50% 30% at 50% 60%, #F2EDED 0%, transparent 50%)`,
          filter: "blur(60px)",
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-25"
        style={{
          background: `radial-gradient(ellipse 70% 40% at 80% 50%, #F2EDED 0%, transparent 50%),
                       radial-gradient(ellipse 50% 30% at 30% 70%, #B8B2B2 0%, transparent 50%),
                       radial-gradient(ellipse 60% 40% at 60% 80%, #F2EDED 0%, transparent 50%)`,
          filter: "blur(80px)",
        }}
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scale: [1.05, 1, 1.05],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 40% 30%, #B8B2B2 0%, transparent 50%),
                       radial-gradient(ellipse 50% 35% at 70% 60%, #F2EDED 0%, transparent 50%),
                       radial-gradient(ellipse 45% 30% at 25% 75%, #B8B2B2 0%, transparent 50%)`,
          filter: "blur(70px)",
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.08, 1],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-15"
        style={{
          background: `radial-gradient(ellipse 55% 35% at 55% 45%, #F2EDED 0%, transparent 50%),
                       radial-gradient(ellipse 40% 28% at 35% 55%, #B8B2B2 0%, transparent 50%)`,
          filter: "blur(50px)",
        }}
        animate={{
          opacity: [0.08, 0.2, 0.08],
          scale: [1.02, 1, 1.02],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(242,237,237,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(242,237,237,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)]" />

      <motion.div
        className="absolute top-[-20%] left-[30%] w-[40%] h-[40%] rounded-full opacity-5"
        style={{
          background:
            "radial-gradient(ellipse, rgba(242,237,237,0.8) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          opacity: [0.03, 0.08, 0.03],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AuroraBackground;
