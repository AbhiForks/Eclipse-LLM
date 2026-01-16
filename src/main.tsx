/**
 * main.tsx
 *
 * Application entry point.
 * Initializes the React application and mounts it to the DOM.
 */

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

/**
 * Create a root and render the application
 */
createRoot(document.getElementById("root")!).render(<App />);
