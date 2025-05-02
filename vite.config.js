import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        'src/assets/',
        '**/*.d.ts',
        '**/*.test.{js,jsx}',
        '**/__tests__/**',
        '**/mocks/**'
      ],
      include: ['src/**/*.{js,jsx}'],
      all: true,
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
      reportsDirectory: './coverage'
    },
  }
})
