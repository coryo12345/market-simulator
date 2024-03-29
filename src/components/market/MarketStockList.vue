<script setup lang="ts">
import { onMounted, shallowRef, watchEffect } from 'vue';
import { useMarketStore } from '../../stores/market';
import { VDataTable } from 'vuetify/components';
import GrowthIcon from './GrowthIcon.vue';
import { storeToRefs } from 'pinia';

const marketStore = useMarketStore();
onMounted(() => {
  marketStore.init();
});

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
        ${{ item.currentPrice.toFixed(2) }}
        <growth-icon :growth="item.growth" />
        <v-tooltip location="top" activator="parent">
          <span>
            Market Cap: ${{
              parseFloat(
                (item.currentPrice * item.company.totalShares).toFixed(2),
              ).toLocaleString()
            }}
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
  </v-data-table>
</template>

<style scoped>
.w-fit {
  width: fit-content;
}
</style>
