<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import TimeseriesChart from '../components/charts/StockTimeseriesChart.vue';
import { useMarketStore } from '../stores/market';

const route = useRoute();
const marketStore = useMarketStore();

const stock = computed(() =>
  marketStore.getByAbbr(route.params.abbr.toString()),
);

const series = computed(() => {
  if (!stock.value) return [];
  return [
    {
      name: `${stock.value.company.abbr} (${stock.value.company.name})`,
      data: stock.value.historic.map((price, idx) => [idx, price]),
    },
  ];
});
</script>

<template>
  <v-card v-if="!stock">
    <template #title>Something went wrong</template>
  </v-card>
  <v-card v-else>
    <template #title>${{ route.params.abbr }}</template>
    <template #subtitle>{{ stock.company.name }}</template>
    <template #text>
      <timeseries-chart
        :series="series"
        title="Stock Prices Over Time"
        y-title="price"
      />
      <h3>About {{ stock.company.name }}</h3>
      <p>{{ stock.company.description }}</p>
    </template>
  </v-card>
</template>
