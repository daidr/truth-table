<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useTheme } from '@/composables';
import { Icon } from '@iconify/vue';
import { useStore } from '../store';
import { watch } from 'vue';

const { t, availableLocales, locale } = useI18n();
const { toggleDark, isDark } = useTheme();

// 监听 locale 改变，写入 localStorage
watch(
  () => locale.value,
  () => {
    localStorage.setItem('lang', locale.value);
  },
);

const store = useStore();
</script>

<template>
  <header class="header">
    <div class="logo">{{ t('page.title') }}</div>
    <div class="toolbar">
      <a href="https://github.com/daidr/truth-table" target="_blank" :title="t('toolbar.github')">
        <Icon icon="uil:github-alt" />
      </a>
      <a href="#" :title="t('toolbar.theme')" @click="toggleDark">
        <Icon :icon="isDark ? 'uil:moon' : 'uil:sun'" />
      </a>
      <a
        href="#"
        :title="t('toolbar.debug')"
        @click="store.$state.inDebugMode = !store.$state.inDebugMode"
      >
        <Icon
          :icon="
            store.$state.inDebugMode
              ? 'uil:layer-group'
              : 'uil:layer-group-slash'
          "
        />
      </a>
      <a
        href="#"
        :title="t('toolbar.intermediate')"
        @click="
          store.$state.showIntermediateProcesses =
          !store.$state.showIntermediateProcesses
        "
      >
        <Icon
          :icon="
            store.$state.showIntermediateProcesses ? 'uil:eye' : 'uil:eye-slash'
          "
        />
      </a>
      <a
        href="#"
        :title="t('toolbar.layout')"
        class="hidden-below-lg"
        @click="store.$state.layoutHorizontal = !store.$state.layoutHorizontal"
      >
        <Icon
          :icon="
            store.$state.layoutHorizontal
              ? 'uil:align-center-h'
              : 'uil:align-center-v'
          "
        />
      </a>
      <select v-model="locale">
        <option v-for="item of availableLocales" :value="item">{{ t(`locate.${item}`) }}</option>
      </select>
    </div>
  </header>
</template>

<style scoped>
.header {
  @apply flex justify-between items-center;
  @apply bg-purple-200 dark:bg-gray-800 rounded-xl shadow-purple-500/10 dark:shadow-dark-900/20 shadow-lg;
  @apply px-3 sm:px-4 md:px-20 py-4 mx-2 sm:mx-4 my-4;
}

.logo {
  @apply font-bold text-base sm:text-lg md:text-2xl;
  @apply select-none;
}

.toolbar {
  @apply flex items-center justify-center gap-x-1;
  @apply text-2xl;
}

.toolbar > * {
  @apply transform-gpu;
}

.toolbar > *:active {
  @apply scale-95;
}

.toolbar a {
  @apply transition;
  @apply flex items-center;
  @apply p-1.5 sm:p-2;
  @apply rounded-lg;
  @apply <sm:text-xl;
}

.toolbar a.hidden-below-lg {
  @apply hidden lg:flex;
}

.toolbar a:hover {
  @apply bg-purple-600 dark:bg-gray-700 text-purple-200 dark:text-gray-200;
}

.toolbar select {
  @apply flex items-center transition outline-transparent;
  @apply py-1.5 px-2 md:px-4;
  @apply rounded-lg bg-transparent;
  @apply text-sm sm:text-base md:text-lg select-none cursor-pointer appearance-none text-center;
}

.toolbar option {
  @apply bg-purple-50 dark:bg-gray-700 text-purple-600 dark:text-gray-200 text-center;
}

.toolbar select:focus,
.toolbar select:hover {
  @apply bg-purple-600 dark:bg-gray-700 text-purple-200 dark:text-gray-200;
}
</style>
