import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Permite que se escuche en cualquier dirección IP
    port: 5173,      // Puerto (opcional, puedes cambiarlo)
  },
  plugins: [react()],
})
