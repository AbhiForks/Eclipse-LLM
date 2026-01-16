/**
 * signatures.ts
 *
 * Developer signatures and metadata for Eclipse LLM.
 * This file contains identification markers for the project.
 *
 * Built by Abhilash V
 * © 2025 Abhilash V - All Rights Reserved
 * GitHub: https://github.com/AbhiForks/Eclipse-LLM
 */

const DEVELOPER_INFO = {
  name: "Abhilash V",
  email: "abhilashvishwa12@gmail.com",
  github: "@AbhiForks",
  website: "https://eclipse-llm.vercel.app",
  repository: "https://github.com/AbhiForks/Eclipse-LLM",
} as const;

const PROJECT_INFO = {
  name: "Eclipse LLM",
  version: "1.0.0",
  signature: "Eclipse-LLM-v1.0.0-by-Abhilash-V",
  codename: "Abhilash-V-Eclipse",
  releaseYear: 2025,
} as const;

export function getDeveloperInfo() {
  return {
    developer: DEVELOPER_INFO.name,
    email: DEVELOPER_INFO.email,
    github: DEVELOPER_INFO.github,
    project: PROJECT_INFO.name,
    version: PROJECT_INFO.version,
    signature: PROJECT_INFO.signature,
    url: DEVELOPER_INFO.repository,
  };
}

export function logDeveloperSignature(): void {
  if (import.meta.env.DEV || import.meta.env.VITE_SHOW_SIGNATURE === "true") {
    console.log(
      `%c⚡ ${PROJECT_INFO.name} ⚡`,
      "font-size: 20px; font-weight: bold; color: #d946ef; background: #1a1a2e; padding: 8px 16px; border-radius: 8px;",
    );
    console.log(
      `%c✨ Built by ${DEVELOPER_INFO.name} ✨`,
      "font-size: 14px; font-style: italic; color: #f59e0b;",
    );
    console.log(`%c📧 ${DEVELOPER_INFO.email}`, "color: #60a5fa;");
    console.log(`%c🐙 ${DEVELOPER_INFO.github}`, "color: #8b5cf6;");
    console.log(
      `%c🔗 ${DEVELOPER_INFO.repository}`,
      "color: #10b981; text-decoration: underline;",
    );
  }
}

export function validateProjectSignature(): boolean {
  return PROJECT_INFO.signature === "Eclipse-LLM-v1.0.0-by-Abhilash-V";
}

export { DEVELOPER_INFO, PROJECT_INFO };
