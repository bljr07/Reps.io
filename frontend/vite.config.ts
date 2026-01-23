import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: { // REMOVE THE ENTIRE CSS CLAUSE WHEN UPGRADING TO BOOTSTRAP v6
    preprocessorOptions: {
      scss: {
        // Silence deprication warnings due to Bootstrap v5
        silenceDeprecations: ['if-function', 'color-functions', 'global-builtin', 'import']
      }
    }
  },
})
