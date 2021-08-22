import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        chunkSizeWarningLimit: 1000,
        outDir: '../dist',
        rollupOptions: {
            output: {
                manualChunks: {
                    deckgl: [
                        '@deck.gl/aggregation-layers',
                        '@deck.gl/core',
                        '@deck.gl/layers'
                    ],
                    mapboxgl: ['mapbox-gl']
                }
            }
        }
    },
    plugins: [vueJsx()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    }
})
