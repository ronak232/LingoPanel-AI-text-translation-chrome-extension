import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      // Define multiple entry points
      input: {
        // Main entry point if needed (for example, for background scripts or a homepage)
        index: resolve(__dirname, "index.html"),
        // Popup page for the extension
        popup: resolve(__dirname, "src/popup/popup.html"),
        // Options page for user settings
        options: resolve(__dirname, "src/options/options.html"),
      },
    },
  },
});
