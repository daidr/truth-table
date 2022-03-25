import { defineConfig } from 'vite';
import { resolve } from 'pathe';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import Components from 'unplugin-vue-components/vite';
import PurgeIcons from 'vite-plugin-purge-icons';
import svgLoader from 'vite-svg-loader';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    // https://github.com/jpkleemans/vite-svg-loader
    svgLoader(),
    // https://github.com/antfu/vite-plugin-components
    Components({
      extensions: ['vue'],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS(),

    // https://github.com/antfu/purge-icons/tree/main/packages/vite-plugin-purge-icons
    PurgeIcons({
      /* PurgeIcons Options */
    }),

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      include: [resolve(__dirname, './locales/**')],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        '/icons/android-chrome-192x192.png',
        '/icons/android-chrome-512x512.png',
        '/icons/apple-touch-icon.png',
        '/icons/apple-touch-icon-precomposed.png',
        '/icons/browserconfig.xml',
        '/icons/favicon.ico',
        '/icons/favicon-16x16.png',
        '/icons/favicon-32x32.png',
        '/icons/mstile-70x70.png',
        '/icons/mstile-144x144.png',
        '/icons/mstile-150x150.png',
        '/icons/mstile-310x150.png',
        '/icons/mstile-310x310.png',
        '/icons/safari-pinned-tab.svg',
      ],
      manifest: {
        name: 'Truth Table | 真值表',
        short_name: 'Truth Table',
        description: '根据逻辑表达式自动生成真值表',
        icons: [
          {
            src: '/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        theme_color: '#ddd6fe',
        start_url: 'https://tb.daidr.me',
        background_color: '#f5f3ff',
        display: 'standalone',
      },
    }),
  ],

  optimizeDeps: {
    include: ['vue', '@vueuse/core'],
    exclude: ['vue-demi'],
  },
});
