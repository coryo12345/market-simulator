<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import { useMarketStore } from '../../stores/market';
import {} from 'vuetify';
import { VDataTable } from 'vuetify/components';

const marketStore = useMarketStore();
onMounted(() => {
  marketStore.init();
});

const headers = shallowRef<Record<string, any>[]>([
  {
    title: 'Name',
    value: 'company.name',
  },
  {
    title: 'Abbr',
    value: 'company.abbr',
  },
]);
</script>

<template>
  <v-data-table :headers="headers" :items="marketStore.stocks"></v-data-table>
</template>
