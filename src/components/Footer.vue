<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const { t } = useI18n()

const installBtnEl = ref();
const showInstall = ref(false);
let installFunction = () => { };

type BeforeInstallPromptEvent = Event & {
  prompt: (event?: Event) => void;
};

window.addEventListener('beforeinstallprompt', (e: BeforeInstallPromptEvent) => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return e.preventDefault();
  } else {
    showInstall.value = true;
    installFunction = () => e.prompt();
    return e.preventDefault();
  }
});
</script>

<template>
  <footer :class="{ 'show-install': showInstall }">
    <a ref="installBtnEl" id="install" href="#" @click="installFunction">
      <Icon icon="uil:browser" />
      {{ t('install.prompt') }}
    </a>
    <p>
      Coded By
      <a target="_blank" href="https://daidr.me">{{ t('footer.author') }}</a> With ❤️
    </p>
  </footer>
</template>

<style>
footer {
  @apply text-center opacity-75;
  @apply py-8;
  @apply absolute bottom-0 left-0 right-0 select-none;
  @apply transition-all;
}

footer.show-install {
  @apply py-4;
}

footer #install {
  @apply opacity-0 mb-0;
  @apply transition-all;
}

footer.show-install #install {
  @apply opacity-100 mb-2;
}

a {
  @apply px-1 py-0.5 rounded-md transition;
  @apply inline-flex items-center gap-x-1;
}

a:hover {
  @apply bg-purple-600 dark:bg-gray-500 text-gray-50;
}
</style>
