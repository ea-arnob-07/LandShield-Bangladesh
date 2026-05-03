import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { landApiPlugin } from './server/dev-adapter.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), landApiPlugin()],
  server: { host: '0.0.0.0', port: 4173, strictPort: true, allowedHosts: ['terminal.local'] },
  build: { outDir: 'dist/client', chunkSizeWarningLimit: 1500 },
})
