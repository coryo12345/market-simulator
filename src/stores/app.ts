import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const showSideNav = ref<boolean | null>(null);

  return {
    showSideNav,
  };
});
