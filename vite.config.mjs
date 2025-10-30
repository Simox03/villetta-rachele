import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Soluzione per usare __dirname nei moduli ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plugin che copia automaticamente il file _redirects in dist/
const copyRedirects = () => ({
  name: 'copy-redirects',
  closeBundle() {
    const src = path.resolve(__dirname, '_redirects')
    const dest = path.resolve(__dirname, 'dist/_redirects')
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest)
      console.log('✅ File _redirects copiato correttamente nella cartella dist/')
    } else {
      console.warn('⚠️ Attenzione: Nessun file _redirects trovato nella cartella principale!')
    }
  },
})

// Esporta la configurazione di Vite
export default defineConfig({
  plugins: [react(), copyRedirects()],
})