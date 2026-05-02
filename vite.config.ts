import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  // GitHub Pages serves this project at /<repo>/, not at /.
  // The Actions workflow sets GITHUB_PAGES=1 during build.
  base: process.env.GITHUB_PAGES ? "/fincast/" : "/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    /** If 5173 is taken, Vite picks the next free port — check the terminal URL. */
    strictPort: false,
    host: true,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Pragma: "no-cache",
    },
  },
  /** If you use `npm run preview`, it serves `dist/` — run `npm run build` first or use `preview:live`. */
  preview: {
    port: 4173,
    strictPort: false,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Pragma: "no-cache",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
