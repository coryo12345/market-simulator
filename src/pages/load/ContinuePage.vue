<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useWalletStore } from '../../stores/wallet';
import { useMarketStore } from '../../stores/market';
import { SaveState } from '../../utils/SaveState';
import { useRouter } from 'vue-router';
import { useAppStore } from '../../stores/app';

const router = useRouter();
const walletStore = useWalletStore();
const marketStore = useMarketStore();
const appStore = useAppStore();

const showError = ref(false);

onMounted(() => continueSave());

async function continueSave() {
  const saveState = new SaveState(walletStore, marketStore);
  const success = saveState.loadFromLocalStorage();
  if (!success) {
    showError.value = true;
    await router.push({ name: 'menu' });
  } else {
    appStore.gameLoaded = true;
    await router.push({ name: 'home' });
  }
}
</script>

<template>
  <div class="d-flex justify-center align-center mt-10">
    <v-progress-circular color="primary" size="large" indeterminate class="mx-auto"></v-progress-circular>
  </div>
  <v-snackbar v-model="showError" color="red">
    <div class="d-flex align-center">
      <v-icon icon="mdi-alert-circle-outline" class="mr-1 mb-1" />
      <span>
        Unable to load save data. Save content may be corrupted or missing.
      </span>
    </div>
  </v-snackbar>
</template>
