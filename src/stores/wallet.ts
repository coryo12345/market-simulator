import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useWalletStore = defineStore('wallet', function () {
  const money = ref(1000);

  const ownedStocks = ref([]);

  const netWorth = computed(() => {
    // TODO - include value of stocks owned
    return money;
  });

  return {
    money,
    ownedStocks,
    netWorth,
  };
});
