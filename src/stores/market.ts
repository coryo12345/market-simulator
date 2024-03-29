import { defineStore } from 'pinia';
import { shallowRef } from 'vue';
import { Growth, Stock } from '../models/market';
import { COMPANIES } from '../companies';

export const useMarketStore = defineStore('market', function () {
  const stocks = shallowRef<Stock[]>([]);

  function init() {
    stocks.value = createNewMarket();
  }

  return {
    stocks,
    init,
  };
});

function createNewMarket(): Stock[] {
  const growths: Growth[] = [
    Growth.DECREASE_MAJOR,
    Growth.DECREASE,
    Growth.DECREASE_MINOR,
    Growth.INCREASE_MINOR,
    Growth.INCREASE,
    Growth.INCREASE_MAJOR,
  ];
  const stocks: Stock[] = [];

  for (const company of COMPANIES) {
    stocks.push({
      company,
      historic: [],
      availableShares: Math.round(
        company.totalShares * (Math.random() * 0.5 + 0.5),
      ),
      currentPrice: Math.random() * 100 + 20,
      growth: growths[Math.floor(Math.random() * growths.length)],
    });
  }

  return stocks;
}
