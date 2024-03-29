<script setup lang="ts">
import { useRoute } from 'vue-router';
import TimeseriesChart from '../components/charts/StockTimeseriesChart.vue';
import { ref } from 'vue';

const route = useRoute();

const series = ref([
  {
    name: 'XYZ MOTORS',
    data: [
      [new Date().getTime() - 100000000, 50],
      [new Date().getTime(), 45],
    ],
  },
]);
</script>

<template>
  <p>{{ route.params.abbr }}</p>
  <timeseries-chart
    :series="series"
    title="Stock Prices Over Time"
    y-title="price"
  />
</template>
