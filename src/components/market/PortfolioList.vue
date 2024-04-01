<script setup lang="ts">
import { computed, ref } from 'vue';
import { useWalletStore } from '../../stores/wallet';
import { storeToRefs } from 'pinia';
import { useMarketStore } from '../../stores/market';
import { formatMoney } from '../../utils';
import { OwnedStock } from '../../models/wallet';
import StockTransactionDialog from './StockTransactionDialog.vue';
import { Stock } from '../../models/market';

const walletStore = useWalletStore();
const marketStore = useMarketStore();
const { ownedStocks } = storeToRefs(walletStore);

type OwnedStockItem = OwnedStock & {
  name: string;
  currentValue: string;
  totalValue: string;
  stock: Stock;
};
const stocks = computed<OwnedStockItem[]>(
  () =>
    ownedStocks.value
      .map((ownedStock) => {
        const stock = marketStore.getByAbbr(ownedStock.ticker);
        if (!stock) return undefined;
        return {
          ...ownedStock,
          name: stock.company.name,
          currentValue: formatMoney(stock.currentPrice),
          totalValue: formatMoney(stock.currentPrice * ownedStock.sharesOwned),
          stock: stock,
        };
      })
      .filter((s) => !!s) as OwnedStockItem[],
);

const headers = ref<Record<string, any>[]>([
  {
    title: 'Company',
    value: 'ticker',
  },
  {
    title: 'Shares Owned',
    value: 'sharesOwned',
  },
  {
    title: 'Shares Value',
    value: 'totalValue',
  },
  {
    title: 'Sell',
    value: 'sell',
  },
]);
</script>

<template>
  <v-data-table v-if="stocks.length > 0" :headers="headers" :items="stocks">
    <template #item.ticker="{ item }">
      {{ item.ticker }} ({{ item.name }})
    </template>
    <template #item.totalValue="{ item }">
      <span class="d-flex align-center w-fit">
        {{ item.totalValue }}
        <v-tooltip location="top" activator="parent">
          Price per share: {{ item.currentValue }}
        </v-tooltip>
      </span>
    </template>
    <template #item.sell="{ item }">
      <stock-transaction-dialog type="sell" :stock="item.stock" />
    </template>
  </v-data-table>
  <p v-else>Purchase some stocks on the market to add to your portfolio</p>
</template>
../../utils/utils
