/**
 * DeveloperSignature.tsx
 *
 * Hidden developer signature component.
 * This component renders an invisible div with developer metadata
 * for identification purposes.
 *
 * Built by Abhilash V
 * © 2025 Abhilash V - All Rights Reserved
 */

interface DeveloperSignatureProps {
  showInProduction?: boolean;
}

export function DeveloperSignature({
  showInProduction = false,
}: DeveloperSignatureProps) {
  if (!showInProduction && !import.meta.env.DEV) {
    return null;
  }

  return (
    <div
      data-project="Eclipse-LLM"
      data-version="1.0.0"
      data-built-by="Abhilash-V"
      data-email="abhilashvishwa12@gmail.com"
      data-github="@AbhiForks"
      data-url="https://github.com/AbhiForks/Eclipse-LLM"
      data-signature="Eclipse-LLM-v1.0.0-by-Abhilash-V"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
      aria-hidden="true"
    >
      Built by Abhilash V - Eclipse LLM -
      https://github.com/AbhiForks/Eclipse-LLM
    </div>
  );
}

export default DeveloperSignature;
