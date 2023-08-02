import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: import.meta.env.VITE_PUBLIC_URL,
  base: '/template1-project',
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:9090/api",
        changeOrigin: true,
        secure: false,
        // ws: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "@testing-library/jest-dom",
    mockReset: true,
  },
})
