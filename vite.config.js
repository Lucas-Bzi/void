import react from "@vitejs/plugin-react"
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@ui', replacement: fileURLToPath(new URL('./src/components/ui', import.meta.url)) }, 
    ],
  },
});