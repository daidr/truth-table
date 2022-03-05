import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      layoutHorizontal: true,
      inDebugMode: false,
      showIntermediateProcesses: true,
    };
  },
});
