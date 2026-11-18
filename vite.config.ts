import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    // Windows 下编辑器写入临时文件（.*.tmpdir、*.tmp）会被文件监听器锁住并导致 EBUSY 崩溃
    watch: {
      ignored: ["**/.*.tmpdir/**", "**/.*.tmp", "**/*.tmp", "**/node_modules/**", "**/.git/**"],
    },
  },
});
