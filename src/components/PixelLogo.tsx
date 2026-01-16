/**
 * PixelLogo.tsx
 *
 * Custom pixel-art style logo for Eclipse LLM.
 * Creates retro-styled pixel text and icon.
 * Monochrome design for Eclipse.
 *
 * Built by Abhilash V
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { FC } from "react";

interface PixelLogoProps {
  size?: number;
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

// Pixel font definition (7 rows x variable columns)
const PIXEL_FONT: Record<string, string[]> = {
  E: ["1111", "1000", "1000", "1111", "1000", "1000", "1111"],
  C: ["0111", "1000", "1000", "1000", "1000", "1000", "0111"],
  L: ["1000", "1000", "1000", "1000", "1000", "1000", "1111"],
  I: ["111", "010", "010", "010", "010", "010", "111"],
  P: ["1111", "1001", "1001", "1111", "1000", "1000", "1000"],
  S: ["0111", "1000", "1000", "0111", "0001", "0001", "1110"],
  O: ["0111", "1001", "1001", "1001", "1001", "1001", "0111"],
  "-": ["0000", "0000", "0000", "1111", "0000", "0000", "0000"],
};

interface PixelTextProps {
  text?: string;
  pixelSize?: number;
  color?: string;
  glowColor?: string;
  animated?: boolean;
}

const PixelText: FC<PixelTextProps> = ({
  text = "ECLIPSE",
  pixelSize = 6,
  color = "#F2EDED",
  glowColor = "#F2EDED",
  animated = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!animated) {
      setIsVisible(true);
      return;
    }
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [animated]);

  const allPixels: { char: string; row: number; col: number; delay: number }[] =
    [];
  const charXPositions: number[] = [];
  const currentX = 0;

  text.split("").forEach((char, charIdx) => {
    const charData = PIXEL_FONT[char.toUpperCase()];
    charXPositions.push(currentX);
    if (charData) {
      const charWidth = charData[0].length;
      charData.forEach((row, rowIdx) => {
        row.split("").forEach((pixel, colIdx) => {
          if (pixel === "1") {
            allPixels.push({
              char: char,
              row: rowIdx,
              col: colIdx,
              delay: charIdx * 7 + rowIdx * 0.05 + colIdx * 0.02,
            });
          }
        });
      });
      currentX + (charWidth + 1) * pixelSize;
    }
  });

  const svgWidth = currentX - pixelSize;
  const svgHeight = 7 * pixelSize;

  return (
    <div className="inline-block">
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible", display: "block" }}
      >
        <defs>
          <filter id={`glow-${text.replace(/\s/g, "")}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {isVisible &&
          allPixels.map((pixel) => {
            const charWidth =
              PIXEL_FONT[pixel.char.toUpperCase()]?.[0]?.length || 4;
            const charIndex = text.indexOf(pixel.char);
            const x = charXPositions[charIndex] + pixel.col * pixelSize;
            const y = pixel.row * pixelSize;

            return (
              <motion.rect
                key={`${pixel.char}-${pixel.row}-${pixel.col}`}
                x={x}
                y={y}
                width={pixelSize - 1}
                height={pixelSize - 1}
                fill={color}
                filter={`url(#glow-${text.replace(/\s/g, "")})`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: animated ? pixel.delay : 0,
                  ease: "backOut",
                }}
              />
            );
          })}
      </svg>
    </div>
  );
};

const PixelLogo: FC<PixelLogoProps> = ({
  size = 48,
  showText = true,
  animated = true,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        className="relative flex-shrink-0"
        style={{ width: size, height: size }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
      >
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#F2EDED] to-[#B8B2B2] blur-xl opacity-50"
          animate={animated ? { opacity: [0.3, 0.6, 0.3] } : {}}
          transition={animated ? { duration: 3, repeat: Infinity } : {}}
        />

        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 0 8px rgba(242, 237, 237, 0.5))" }}
        >
          <rect x="0" y="0" width="24" height="24" rx="4" fill="#000" />
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="4"
            fill="none"
            stroke="#F2EDED"
            strokeWidth="1.5"
          />
          <motion.path
            d="M7 8h10M7 12h8M6 16h12"
            stroke="#F2EDED"
            strokeWidth="2"
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={animated ? { duration: 1.5, ease: "easeInOut" } : {}}
          />
          <motion.line
            x1="2"
            y1="12"
            x2="22"
            y2="12"
            stroke="#F2EDED"
            strokeWidth="1"
            strokeOpacity="0.3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={animated ? { delay: 0.5 } : {}}
          />
          <motion.line
            x1="12"
            y1="2"
            x2="12"
            y2="22"
            stroke="#F2EDED"
            strokeWidth="1"
            strokeOpacity="0.3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={animated ? { delay: 0.7 } : {}}
          />
        </svg>
      </motion.div>

      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: animated ? 0.3 : 0, duration: 0.5 }}
        >
          <PixelText
            text="ECLIPSE"
            pixelSize={5}
            color="#F2EDED"
            glowColor="#F2EDED"
            animated={animated}
          />
        </motion.div>
      )}
    </div>
  );
};

export default PixelLogo;
export { PixelText, PIXEL_FONT };
