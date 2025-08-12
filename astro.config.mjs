// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
      allowedHosts: [
        '.weeklysocial.es'
      ]
    },
  vite: {
    plugins: [tailwindcss()],
  }
});
