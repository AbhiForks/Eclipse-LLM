
import { FC } from "react";
import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  className?: string;
  variant?: "default" | "loading" | "minimal";
}

const Logo: FC<LogoProps> = ({ size = 40, className = "", variant = "default" }) => {
  if (variant === "minimal") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="30" height="30" rx="5" transform="rotate(45 25 25)" fill="#121212" stroke="#a855f7" strokeWidth="2" />
            <circle cx="25" cy="25" r="8" fill="#a855f7" />
          </svg>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div 
        className="relative rounded-full overflow-hidden flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="30" height="30" rx="5" transform="rotate(45 25 25)" fill="#121212" stroke="#a855f7" strokeWidth="2" />
          <circle cx="25" cy="25" r="8" fill="#a855f7" />
        </svg>
      </div>
      <span className="font-semibold text-xl tracking-tight text-white">Eclipse</span>
    </div>
  );
};

export default Logo;
