
import { motion } from "framer-motion";
import { FC } from "react";

interface GlowEffectProps {
  className?: string;
}

const GlowEffect: FC<GlowEffectProps> = ({ className = "" }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-glow opacity-30"
      />
      <motion.div
        initial={{ opacity: 0.3, scale: 0.6 }}
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute -top-[200px] -right-[200px] w-[400px] h-[400px] rounded-full bg-purple-600/30 blur-3xl opacity-20"
      />
      
      <motion.div
        initial={{ opacity: 0.2, scale: 0.5 }}
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute -bottom-[200px] -left-[300px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-600/20 to-indigo-500/20 blur-3xl opacity-20"
      />
    </div>
  );
};

export default GlowEffect;
