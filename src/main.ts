import { createApp } from 'vue';
import App from './App.vue';
import '@purge-icons/generated';
import { createI18n } from 'vue-i18n';
import('./pwa');

import './styles/base.css';

// i18n
import messages from '@intlify/vite-plugin-vue-i18n/messages';

// 尝试从 localstorage或navigator.language中获取语言
const lang = localStorage.getItem('lang') || navigator.language.toLowerCase();

const i18n = createI18n({
  locale: lang,
  fallbackLocale: 'en',
  messages,
});

// WindiCSS
import 'virtual:windi.css';
import 'virtual:windi-devtools';

// Pinia
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(i18n);

app.use(createPinia());

app.mount('#app');
