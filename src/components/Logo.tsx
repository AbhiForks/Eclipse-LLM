
import { FC } from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: FC<LogoProps> = ({ size = 40, className = "" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div 
        className="relative rounded-full overflow-hidden animate-pulse-slow"
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 bg-gradient-cosmic-alt opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/2 h-1/2 bg-white rounded-full animate-float"></div>
        </div>
      </div>
      <span className="font-semibold text-xl tracking-tight text-gradient">DeepSeek</span>
    </div>
  );
};

export default Logo;
