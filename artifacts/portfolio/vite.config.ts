import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const rawPort = process.env.PORT;
const port = rawPort && !Number.isNaN(Number(rawPort)) && Number(rawPort) > 0
  ? Number(rawPort)
  : 5173;

const basePath = process.env.BASE_PATH ?? "/";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(async ({ mode }) => {
  const isProduction = mode === "production";
  const plugins = [react(), tailwindcss()];

  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    const carto = await import("@replit/vite-plugin-cartographer");
    const devBanner = await import("@replit/vite-plugin-dev-banner");
    plugins.push(
      carto.cartographer({ root: path.resolve(__dirname, "..") }),
      devBanner.devBanner(),
    );
  }

  return {
    base: basePath,
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "..", "..", "attached_assets"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(__dirname),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      port,
      host: "0.0.0.0",
      allowedHosts: ["localhost", "127.0.0.1"],
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
        },
      },
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
    preview: {
      port,
      host: "127.0.0.1",
      allowedHosts: ["localhost", "127.0.0.1"],
    },
  };
});
