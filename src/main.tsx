/**
 * Eclipse LLM
 *
 * A modern, AI-powered chat application.
 *
 * Built with ❤️ by Abhilash V
 * © 2025 Abhilash V - All Rights Reserved
 *
 * GitHub:  https://github.com/AbhiForks/Eclipse-LLM
 * Website: https://eclipse-llm.vercel.app
 * Email:   abhilashvishwa12@gmail.com
 *
 * This project is licensed under the MIT License.
 */

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { logDeveloperSignature } from "./lib/signatures";

// Log developer signature in development
logDeveloperSignature();

// Create a root and render the application
createRoot(document.getElementById("root")!).render(<App />);
