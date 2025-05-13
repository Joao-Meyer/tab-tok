import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  build: {
    outDir: './build'
  },
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true
      },
      manifest: {
        background_color: '#151519',
        display: 'standalone',
        icons: [
          {
            sizes: '512x512',
            src: '/icon.png',
            type: 'image/png'
          }
        ],
        name: 'TabTok',
        short_name: 'TabTok',
        start_url: '/painel',
        theme_color: '#151519'
      },
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
      }
    })
  ],
  resolve: {
    alias: [
      {
        find: 'data',
        replacement: resolve(__dirname, 'src/data')
      },
      {
        find: 'domain',
        replacement: resolve(__dirname, 'src/domain')
      },
      {
        find: 'infra',
        replacement: resolve(__dirname, 'src/infra')
      },
      {
        find: 'main',
        replacement: resolve(__dirname, 'src/main')
      },
      {
        find: 'presentation',
        replacement: resolve(__dirname, 'src/presentation')
      },
      {
        find: 'validation',
        replacement: resolve(__dirname, 'src/validation')
      },
      {
        find: 'store',
        replacement: resolve(__dirname, 'src/store')
      }
    ]
  }
});
