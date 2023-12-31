import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import PackageJson from "./package.json";

/**
 * Vite configuration
 * @see ( https://vitejs.dev/config/ )
 */
export default defineConfig({
  server: {
    port: 2300,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "~",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/index.ts"),
      name: "archivist-ui",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        ...Object.keys(PackageJson.peerDependencies),
      ],
      output: {
        globals: {
          react: "React",
          ["react-dom"]: "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        presets: ["@emotion/babel-preset-css-prop"],
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    dts(),
  ],
});
