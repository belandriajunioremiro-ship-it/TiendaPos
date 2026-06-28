import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: "https://tiendapos-app.vercel.app",
  integrations: [
    react(),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date('2026-06-28'),
      filter: (page) => !page.includes('/404'),
      serialize: (page) => {
        if (page.url === "https://tiendapos-app.vercel.app/") {
          return { ...page, priority: 1.0, changefreq: 'daily' };
        }
        if (page.url.includes('/servicios/') || page.url.includes('/por-que-elegirnos')) {
          return { ...page, priority: 0.9, changefreq: 'weekly' };
        }
        if (page.url.includes('/aviso-legal') || page.url.includes('/terminos') || page.url.includes('/privacidad')) {
          return { ...page, priority: 0.3, changefreq: 'monthly' };
        }
        return page;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
