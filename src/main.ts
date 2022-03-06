import { createApp } from 'vue';
import App from './App.vue';
import '@purge-icons/generated';
import { createI18n } from 'vue-i18n';

import './styles/base.css';

// i18n
import messages from '@intlify/vite-plugin-vue-i18n/messages';

const i18n = createI18n({
  locale: 'zh-cn',
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
