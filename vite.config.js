import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/P3RCollection/",
  publicDir: "assets",
  plugins: [react(), tailwindcss()],
});
