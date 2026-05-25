import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Vite config — StudyHub Frontend
 *
 * Proxy /api → Spring Boot (tránh CORS khi dev local).
 * Khi build production: VITE_API_BASE_URL trỏ thẳng đến server thật,
 * không cần proxy nữa.
 *
 * Để dùng proxy: đảm bảo VITE_API_BASE_URL=/api trong file .env.development
 * Nếu vẫn dùng URL tuyệt đối (http://localhost:8080/api): proxy không có tác dụng
 * nhưng cũng không gây lỗi — CORS phải được bật phía Spring Boot.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    port: 3000,
    proxy: {
      // Chuyển tất cả request /api/* → Spring Boot :8080
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        // Nếu Spring Boot không có prefix /api: rewrite: (path) => path.replace(/^\/api/, "")
      },
      // Chuyển WebSocket /ws/* → Spring Boot :8080
      "/ws": {
        target: "ws://localhost:8080",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
