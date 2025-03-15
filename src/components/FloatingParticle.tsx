
import { motion } from "framer-motion";
import { FC } from "react";

interface FloatingParticleProps {
  size?: number;
  duration?: number;
  delay?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  className?: string;
}

const FloatingParticle: FC<FloatingParticleProps> = ({
  size = 6,
  duration = 20,
  delay = 0,
  top,
  left,
  right,
  bottom,
  className = "",
}) => {
  return (
    <motion.div
      className={`absolute rounded-full bg-white/10 backdrop-blur-sm ${className}`}
      style={{ 
        width: size, 
        height: size, 
        top, 
        left, 
        right, 
        bottom 
      }}
      initial={{ opacity: 0.1 }}
      animate={{
        y: [0, -15, 0, 15, 0],
        x: [0, 10, 0, -10, 0],
        opacity: [0.1, 0.3, 0.1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    />
  );
};

export default FloatingParticle;
