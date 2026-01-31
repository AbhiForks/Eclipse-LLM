import type { FC } from "react";
import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  className?: string;
  variant?: "default" | "loading" | "minimal";
  onClick?: () => void;
}

const Logo: FC<LogoProps> = ({
  size = 40,
  className = "",
  variant = "default",
  onClick,
}) => {
  if (variant === "minimal") {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        onClick={onClick}
      >
        <motion.div
          className="relative cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 5L5 25L25 45L45 25L25 5Z"
              stroke="url(#paint0_linear)"
              strokeWidth="2"
              fill="#121212"
            />
            <circle cx="25" cy="25" r="10" fill="url(#paint1_linear)" />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="5"
                y1="25"
                x2="45"
                y2="25"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#d946ef" />
                <stop offset="1" stopColor="#d946ef" />
              </linearGradient>
              <linearGradient
                id="paint1_linear"
                x1="15"
                y1="25"
                x2="35"
                y2="25"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#d946ef" />
                <stop offset="1" stopColor="#d946ef" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center space-x-2 ${className} cursor-pointer`}
      onClick={onClick}
    >
      <div
        className="relative rounded-full overflow-hidden flex items-center justify-center bg-black"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 5L5 25L25 45L45 25L25 5Z"
            stroke="url(#paint0_linear)"
            strokeWidth="2"
            fill="#121212"
          />
          <circle cx="25" cy="25" r="10" fill="url(#paint1_linear)" />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="5"
              y1="25"
              x2="45"
              y2="25"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#d946ef" />
              <stop offset="1" stopColor="#d946ef" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="15"
              y1="25"
              x2="35"
              y2="25"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#d946ef" />
              <stop offset="1" stopColor="#d946ef" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="font-semibold text-xl tracking-tight text-white">
        Eclipse
      </span>
    </div>
  );
};

export default Logo;
