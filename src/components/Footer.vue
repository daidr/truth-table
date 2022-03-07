<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>

<template>
  <footer>
    <p>
      Coded By
      <a target="_blank" href="https://daidr.me">{{ t('footer.author') }}</a> With ❤️
    </p>
  </footer>
</template>

<style>
footer {
  @apply text-center opacity-75;
  @apply py-4;
  @apply absolute bottom-0 left-0 right-0 select-none;
}

a {
  @apply px-1 py-0.5 rounded-md transition;
}

a:hover {
  @apply bg-purple-600 dark:bg-gray-500 text-gray-50;
}
</style>
