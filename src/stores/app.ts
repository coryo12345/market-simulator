import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', function () {
  const showSideNav = ref<boolean | null>(null);

  return {
    showSideNav,
  };
});
