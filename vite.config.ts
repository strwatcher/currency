import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from 'vite-plugin-babel'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [babel({
    babelConfig: {
    }
  }), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
