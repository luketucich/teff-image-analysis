import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves project sites under /<repo>/, so the build needs to
// know its base path. Toggle via VITE_BASE if the repo name ever changes.
const base = process.env.VITE_BASE ?? '/teff-image-analysis/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    sourcemap: false,
  },
});
