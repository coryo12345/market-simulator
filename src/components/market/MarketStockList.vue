<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { shallowRef } from 'vue';
import { VDataTable } from 'vuetify/components';
import { useMarketStore } from '../../stores/market';
import GrowthIcon from './GrowthIcon.vue';
import StockTransactionDialog from './StockTransactionDialog.vue';
import { formatMoney } from '../../utils';

const marketStore = useMarketStore();

const { stocks } = storeToRefs(marketStore);

const headers = shallowRef<Record<string, any>[]>([
  {
    title: 'Name',
    value: 'company.name',
  },
  {
    title: 'Abbr',
    value: 'company.abbr',
  },
  {
    title: 'Stock Price',
    value: 'currentPrice',
  },
  {
    title: 'Available Shares',
    value: 'availableShares',
  },
  {
    title: 'Buy',
    value: 'buy',
  },
]);
</script>

<template>
  <v-data-table :headers="headers" :items="stocks">
    <template #item.company.name="{ item }">
      <router-link
        :to="{ name: 'stock', params: { abbr: item.company.abbr } }"
        class="text-decoration-none text-primary"
      >
        {{ item.company.name }}
      </router-link>
    </template>
    <template #item.currentPrice="{ item }">
      <span class="d-flex align-center w-fit">
        {{ formatMoney(item.currentPrice) }}
        <growth-icon :growth="item.growth" />
        <v-tooltip location="top" activator="parent">
          <span>
            Market Cap:
            {{ formatMoney(item.currentPrice * item.company.totalShares) }}
          </span>
        </v-tooltip>
      </span>
    </template>
    <template #item.availableShares="{ item }">
      <span>
        {{ item.availableShares.toLocaleString() }}
        <v-tooltip location="top" activator="parent">
          <span>
            Total Shares: {{ item.company.totalShares.toLocaleString() }}
          </span>
        </v-tooltip>
      </span>
    </template>
    <template #item.buy="{ item }">
      <stock-transaction-dialog :stock="item" type="buy" />
    </template>
  </v-data-table>
</template>

<style scoped>
.w-fit {
  width: fit-content;
}
</style>
