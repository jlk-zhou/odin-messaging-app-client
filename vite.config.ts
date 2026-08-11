import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
    extensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackRouter({
      target: "react",
      quoteStyle: "double",
      autoCodeSplitting: true,
      routeFileIgnorePattern: "tests?|components?",
    }),
    viteReact(),
  ],
  define: {
    "import.meta.env.TEST": JSON.stringify(process.env.NODE_ENV === "test"),
  },
});

export default config;
