import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages 项目页地址为 https://<user>.github.io/yys-daily-checklist/
// 如果部署到自定义域名或用户主页仓库,请把 base 改成 '/'
export default defineConfig({
  base: '/yys-daily-checklist/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: '阴阳师每日待办',
        short_name: '阴阳师待办',
        description: '阴阳师每日/每周任务清单,数据仅存本地,可离线使用',
        theme_color: '#1e1b2e',
        background_color: '#1e1b2e',
        display: 'standalone',
        start_url: '/yys-daily-checklist/',
        scope: '/yys-daily-checklist/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      },
    }),
  ],
})
