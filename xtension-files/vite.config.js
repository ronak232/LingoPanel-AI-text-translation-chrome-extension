import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      // Define multiple entry points
      input: {
        index: resolve(__dirname, "index.html"),
        popup: resolve(__dirname, "src/popup/popup.html"),
        background: resolve(__dirname, "src/background/background.js"),
        sidepanel: resolve(__dirname, "src/sidepanel.html"),
      },
      output: {
        // Customize output file names based on the chunk name
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "background") {
            // This will output to /background/background.js in the build folder
            return "background/[name].js";
          }
          // For other entries, use the default hashing pattern
          return "assets/[name]-[hash].js";
        },
      },
    },
  },
});
