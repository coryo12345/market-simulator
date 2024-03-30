import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { OwnedStock } from '../models/wallet';
import { useMarketStore } from './market';

export const useWalletStore = defineStore('wallet', function () {
  const marketStore = useMarketStore();

  const money = ref(1000.0);
  const ownedStocks = ref<OwnedStock[]>([]);

  const stockValue = computed<number>(() =>
    ownedStocks.value.reduce((prev, curr) => {
      const stock = marketStore.stocks.find(
        (s) => s.company.abbr === curr.ticker,
      );
      if (!stock) return prev;
      return prev + stock.currentPrice * curr.sharesOwned;
    }, 0),
  );

  const netWorth = computed<number>(() => stockValue.value + money.value);

  return {
    money,
    ownedStocks,
    stockValue,
    netWorth,
  };
});
