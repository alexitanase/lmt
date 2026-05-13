import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'node:path';

export default defineConfig(({ command }) => ({
  plugins: [preact()],
  root: command === 'serve' ? '.' : undefined,
  server: {
    port: 5173,
    open: '/examples/playground.html',
  },
  build: {
    target: 'es2020',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LMT',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'lmt.esm.js';
        if (format === 'cjs') return 'lmt.cjs.js';
        return 'lmt.umd.js';
      },
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {},
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
  },
}));
