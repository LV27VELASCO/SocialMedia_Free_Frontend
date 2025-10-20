// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  i18n: {
    locales: ["es", "fr", "en", "pt", "de"],
    defaultLocale: "es",
    routing: {
        prefixDefaultLocale: true
    }
  },
  server: {
      allowedHosts: [
        '.trendyup.es',
        '.www.trendyup.es'
      ]
    },
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()]
});