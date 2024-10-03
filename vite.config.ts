import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'ReactBottomScrollListener',
      fileName: 'react-bottom-scroll-listener',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: ['react', 'lodash.debounce'],
      output: {
        globals: {
          react: 'React',
          'lodash.debounce': 'LodashDebounce',
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      exclude: ['example'],
      include: ['src'],
    },
  },
})
