<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import MarketStockList from '../components/market/MarketStockList.vue';
import { useWalletStore } from '../stores/wallet';
import { formatMoney } from '../utils';
import PortfolioList from '../components/market/PortfolioList.vue';
import { useAppStore } from '../stores/app';
import { useRouter } from 'vue-router';
import { useMarketStore } from '../stores/market';
import { SaveState } from '../utils/SaveState';

const walletStore = useWalletStore();
const marketStore = useMarketStore();
const appStore = useAppStore();
const router = useRouter();

const stockValueStr = computed(() => formatMoney(walletStore.stockValue));
const moneyStr = computed(() => formatMoney(walletStore.money));

const saveInterval = ref<null | number>(null);
const showSaveAlert = ref(false);
onMounted(() => {
  if (!appStore.gameLoaded) {
    router.replace({ name: 'menu' });
  }
  const save = new SaveState(walletStore, marketStore);
  saveInterval.value = setInterval(
    () => {
      save.saveToLocalStorage();
      showSaveAlert.value = true;
    },
    1000 * 60 * 3,
  );
});

onUnmounted(() => {
  if (saveInterval.value !== null) {
    clearInterval(saveInterval.value);
  }
});
</script>

<template>
  <v-snackbar v-model="showSaveAlert">
    <div class="d-flex align-center">
      <v-icon icon="mdi-content-save" class="mr-1 mb-1" />
      <span> Autosave complete </span>
    </div>
  </v-snackbar>
  <v-card class="mb-4">
    <template #title>Assets</template>
    <template #subtitle>Your money & owned stocks</template>
    <template #text>
      <h4>Money</h4>
      <p>{{ moneyStr }}</p>
      <h4>Stocks</h4>
      <p class="mb-2">
        Total stock value:
        <span>{{ stockValueStr }} </span>
      </p>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            View Stock Portfolio
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <portfolio-list />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </v-card>
  <v-card>
    <template #title> Current Stock Data </template>
    <template #subtitle> Live view of data for all stocks </template>
    <template #text>
      <market-stock-list />
    </template>
  </v-card>
</template>
