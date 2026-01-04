import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'orbita.makhkets.ru',
      'localhost',
      '.makhkets.ru' // разрешает все поддомены makhkets.ru
    ]
  }
})
