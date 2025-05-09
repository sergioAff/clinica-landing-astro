// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': path.resolve('./src/components')
      }
    },
    build: {
      cssMinify: true,
      minify: 'terser',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'framer-motion': ['framer-motion'],
            'lucide': ['lucide-react'],
          }
        }
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 2
        },
        format: {
          comments: false
        }
      }
    },
    ssr: {
      noExternal: ['@fontsource/*']
    }
  },
  integrations: [react()],
  
  // Optimización para producción
  build: {
    format: 'file',
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    domains: ["media.cssninja.io"],
    remotePatterns: [{ protocol: "https" }],
  },
  compressHTML: true,
  experimental: {
    contentIntellisense: true,
    responsiveImages: true,
  },
});