import { defineStore } from 'pinia';
import { ref } from 'vue';
import { COMPANIES } from '../companies';
import { GROWTHS, Growth, Stock } from '../models/market';
import { Time } from '../models/time';

export const useMarketStore = defineStore('market', function () {
  const stocks = ref<Stock[]>([]);

  const tickInterval = ref<number | null>(null);
  function init() {
    stocks.value = createNewMarket();
    Time.SetTime(0);
    for (let i = 0; i < 10; i++) {
      stocks.value = processStockTime(stocks.value);
    }
    tickInterval.value = setInterval(() => {
      stocks.value = processStockTime(stocks.value);
    }, 1000 * 10);
  }

  function getByAbbr(abbr: string): Stock | undefined {
    return stocks.value.find((s) => s.company.abbr === abbr);
  }

  function $reset() {
    if (tickInterval.value !== null) {
      clearInterval(tickInterval.value);
    }
    init();
  }

  return {
    stocks,
    init,
    getByAbbr,
    $reset,
  };
});

function processStockTime(stocks: Stock[]): Stock[] {
  const newStocks: Stock[] = [];
  Time.IncrementTime();
  stocks.forEach((stock) => {
    // change stock price
    let changeMultiplier = 0.25;
    if (
      stock.growth == Growth.DECREASE_MAJOR ||
      stock.growth == Growth.INCREASE_MAJOR
    ) {
      changeMultiplier = 0.5;
    } else if (
      stock.growth == Growth.DECREASE_MINOR ||
      stock.growth == Growth.INCREASE_MINOR
    ) {
      changeMultiplier = 0.1;
    }

    let directionMult = 1;
    if (
      [Growth.DECREASE, Growth.DECREASE_MAJOR, Growth.DECREASE_MINOR].includes(
        stock.growth,
      )
    ) {
      directionMult = -1;
    }

    const randomMult = changeMultiplier * 0.33 * directionMult;

    stock.currentPrice +=
      Math.random() * changeMultiplier * directionMult - randomMult;
    stock.historic.push(stock.currentPrice);

    // change growth
    if (Math.random() * 20 < stock.company.volatility) {
      stock.growth = GROWTHS[Math.floor(Math.random() * GROWTHS.length)];
    }

    newStocks.push(stock);
  });
  return newStocks;
}

function createNewMarket(): Stock[] {
  const stocks: Stock[] = [];

  for (const company of COMPANIES) {
    stocks.push({
      company,
      historic: [],
      availableShares: Math.round(
        company.totalShares * (Math.random() * 0.5 + 0.5),
      ),
      currentPrice: Math.random() * 100 + 20,
      growth: GROWTHS[Math.floor(Math.random() * GROWTHS.length)],
    });
  }

  return stocks;
}
