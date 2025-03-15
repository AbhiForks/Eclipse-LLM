
import { FC } from "react";
import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  className?: string;
  variant?: "default" | "loading";
}

const Logo: FC<LogoProps> = ({ size = 40, className = "", variant = "default" }) => {
  // Animation variants
  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: { duration: 20, repeat: Infinity, ease: "linear" }
    }
  };
  
  const moonVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };
  
  return variant === "loading" ? (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div 
        className="relative"
        style={{ width: size * 4, height: size * 4 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Orbit ring */}
        <motion.div 
          className="absolute inset-0 border-2 border-purple-500/30 rounded-full"
          variants={orbitVariants}
          animate="animate"
        />
        
        {/* Main circle (eclipse) */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 bg-gradient-to-br from-black to-purple-900 rounded-full shadow-lg shadow-purple-500/20"
          variants={moonVariants}
          animate="animate"
        >
          <div className="absolute right-0 top-1/4 w-1/4 h-1/4 bg-orange-400/40 blur-sm rounded-full" />
        </motion.div>
        
        {/* Small orbiting circles */}
        <motion.div 
          className="absolute"
          animate={{ 
            rotate: 360,
            transition: { duration: 8, repeat: Infinity, ease: "linear" } 
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <motion.div 
            className="absolute -translate-y-1/2 w-[15%] h-[15%] bg-white/80 rounded-full shadow-md shadow-purple-500/30"
            style={{ left: '10%', top: '50%' }}
          />
        </motion.div>
        
        <motion.div 
          className="absolute"
          animate={{ 
            rotate: -360,
            transition: { duration: 12, repeat: Infinity, ease: "linear" } 
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <motion.div 
            className="absolute -translate-y-1/2 w-[10%] h-[10%] bg-white/90 rounded-full shadow-sm shadow-purple-500/20"
            style={{ right: '15%', top: '50%' }}
          />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="mt-10 h-1 w-28 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </div>
  ) : (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div 
        className="relative rounded-full overflow-hidden"
        style={{ width: size, height: size }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black"
          animate={{ 
            boxShadow: ["0 0 10px 0px rgba(139, 92, 246, 0.5)", "0 0 20px 2px rgba(139, 92, 246, 0.7)", "0 0 10px 0px rgba(139, 92, 246, 0.5)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute right-0 top-1/4 w-1/4 h-1/4 bg-orange-400/40 blur-sm rounded-full"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
      <span className="font-semibold text-xl tracking-tight text-gradient">Eclipse</span>
    </div>
  );
};

export default Logo;
