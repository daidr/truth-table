import { Ref, watch } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

export interface ThemeComposition {
  isDark: Ref<boolean>;
  toggleDark: () => boolean;
}

export function useTheme(): ThemeComposition {
  const isDark = useDark();
  const toggleDark = useToggle(isDark);

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isDark.value ? '#374151' : '#f5f3ff');

  watch(isDark, newValue => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', newValue ? '#374151' : '#f5f3ff');
  });

  return {
    isDark,
    toggleDark,
  };
}
