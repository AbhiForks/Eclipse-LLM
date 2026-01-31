import { motion } from "framer-motion";
import { useEffect, useState, type FC } from "react";

interface GlowEffectProps {
  className?: string;
  intensity?: "low" | "medium" | "high";
  colorScheme?: "purple-orange" | "blue-purple" | "green-blue";
}

const GlowEffect: FC<GlowEffectProps> = ({
  className = "",
  intensity = "medium",
  colorScheme = "purple-orange",
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Set up dynamic color classes based on props
  const primaryGlow = {
    "purple-orange": "from-purple-800/30 via-purple-600/20 to-orange-600/20",
    "blue-purple": "from-blue-800/30 via-indigo-600/20 to-purple-600/20",
    "green-blue": "from-emerald-800/30 via-teal-600/20 to-blue-600/20",
  }[colorScheme];

  const secondaryGlow = {
    "purple-orange": "from-orange-600/20 via-rose-500/10 to-purple-800/20",
    "blue-purple": "from-purple-600/20 via-indigo-500/10 to-blue-800/20",
    "green-blue": "from-blue-600/20 via-cyan-500/10 to-emerald-800/20",
  }[colorScheme];

  // Set up intensity values
  const opacityValues = {
    low: { min: 0.1, max: 0.2 },
    medium: { min: 0.2, max: 0.4 },
    high: { min: 0.3, max: 0.5 },
  }[intensity];

  const scaleValues = {
    low: { min: 0.7, max: 0.9 },
    medium: { min: 0.8, max: 1.2 },
    high: { min: 0.9, max: 1.4 },
  }[intensity];

  // Follow mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ opacity: opacityValues.min, scale: scaleValues.min }}
        animate={{
          opacity: [opacityValues.min, opacityValues.max, opacityValues.min],
          scale: [scaleValues.min, scaleValues.max, scaleValues.min],
          x: mousePosition.x * -30,
          y: mousePosition.y * -30,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b ${primaryGlow} blur-3xl`}
      />

      <motion.div
        initial={{
          opacity: opacityValues.min * 0.7,
          scale: scaleValues.min * 0.8,
        }}
        animate={{
          opacity: [
            opacityValues.min * 0.7,
            opacityValues.max * 0.7,
            opacityValues.min * 0.7,
          ],
          scale: [
            scaleValues.min * 0.8,
            scaleValues.max * 0.8,
            scaleValues.min * 0.8,
          ],
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2,
        }}
        className={`absolute -top-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr ${secondaryGlow} blur-3xl`}
      />

      <motion.div
        initial={{
          opacity: opacityValues.min * 0.6,
          scale: scaleValues.min * 0.7,
        }}
        animate={{
          opacity: [
            opacityValues.min * 0.6,
            opacityValues.max * 0.6,
            opacityValues.min * 0.6,
          ],
          scale: [
            scaleValues.min * 0.7,
            scaleValues.max * 0.7,
            scaleValues.min * 0.7,
          ],
          x: mousePosition.x * -15,
          y: mousePosition.y * -15,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 5,
        }}
        className={`absolute -bottom-[200px] -left-[300px] w-[600px] h-[600px] rounded-full bg-gradient-to-tr ${primaryGlow} blur-3xl`}
      />
    </div>
  );
};

export default GlowEffect;
