import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        tunnel: resolve(__dirname, "tunnel/index.html"),
      },
    },
  },
});
