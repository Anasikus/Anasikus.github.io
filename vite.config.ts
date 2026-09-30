import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Карты исходного кода для прод-сборки — без них минифицированный
    // js/скрипты нельзя ни отладить, ни увидеть в отчётах вроде
    // Lighthouse, откуда они действительно вызваны.
    sourcemap: true,
  },
})
