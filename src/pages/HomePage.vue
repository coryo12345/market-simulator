<script setup lang="ts">
import MarketStockList from '../components/market/MarketStockList.vue';
</script>

<template>
  <v-card>
    <template #title> Current Stock Data </template>
    <template #subtitle> Live view of data for all stocks </template>
    <template #text>
      <market-stock-list />
    </template>
  </v-card>
</template>
