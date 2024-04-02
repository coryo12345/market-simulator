<script setup lang="ts">
import { ref } from 'vue';
import { useMarketStore } from '../../stores/market';
import { useWalletStore } from '../../stores/wallet';
import { SaveState } from '../../utils/SaveState';

const showError = ref(false);

function save() {
  const walletStore = useWalletStore();
  const marketStore = useMarketStore();
  const saveState = new SaveState(walletStore, marketStore);
  saveState.saveToLocalStorage();
}

function load() {
  const walletStore = useWalletStore();
  const marketStore = useMarketStore();
  const saveState = new SaveState(walletStore, marketStore);
  const success = saveState.loadFromLocalStorage();
  if (!success) {
    showError.value = true;
  }
}
</script>

<template>
  <v-snackbar v-model="showError" color="red">
    <template #activator>
      <slot name="activator" :save="save" :load="load"></slot>
    </template>
    <div class="d-flex align-center">
      <v-icon icon="mdi-alert-circle-outline" class="mr-1 mb-1" />
      <span>
        Unable to load save data. Save content may be corrupted or missing.
      </span>
    </div>
  </v-snackbar>
</template>
