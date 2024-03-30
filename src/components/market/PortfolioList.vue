<script setup lang="ts">
import { computed, ref } from 'vue';
import { useWalletStore } from '../../stores/wallet';

const walletStore = useWalletStore();

const stocks = computed(() => {
  return walletStore.ownedStocks;
});

const headers = ref<Record<string, any>[]>([
  {
    title: 'Company',
    value: 'ticker',
  },
  {
    title: 'Shares Owned',
    value: 'sharesOwned',
  },
  // {
  //   title: 'Current Value',
  //   value: 'value',
  // },
]);
</script>

<template>
  <v-data-table v-if="stocks.length > 0" :headers="headers" :items="stocks">
    <template></template>
  </v-data-table>
  <p v-else>Purchase some stocks on the market to add to your portfolio</p>
</template>
