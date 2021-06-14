import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../public-build'
  },
  plugins: [vueJsx()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
