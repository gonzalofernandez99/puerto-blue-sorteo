import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El "base" debe coincidir con el nombre del repositorio para que funcione
// en GitHub Pages: https://gonzalofernandez99.github.io/puerto-blue-sorteo/
// Si algun dia cambias el nombre del repo, actualiza esta linea.
export default defineConfig({
  base: '/puerto-blue-sorteo/',
  plugins: [react()],
})
