<script setup lang="ts">
import { ref } from 'vue';
import { useMarketStore } from '../../stores/market';
import { useWalletStore } from '../../stores/wallet';
import { SaveState } from '../../utils/SaveState';

const walletStore = useWalletStore();
const marketStore = useMarketStore();

const showError = ref(false);

function saveLocal() {
  const saveState = new SaveState(walletStore, marketStore);
  saveState.saveToLocalStorage();
}

function loadLocal() {
  const saveState = new SaveState(walletStore, marketStore);
  const success = saveState.loadFromLocalStorage();
  if (!success) {
    showError.value = true;
  }
}

function saveFile() {
  const saveState = new SaveState(walletStore, marketStore);
  saveState.saveToFile();
}

function loadFile() {
  // TODO
}
</script>

<template>
  <v-snackbar v-model="showError" color="red">
    <template #activator>
      <slot
        name="activator"
        :saveLocal="saveLocal"
        :loadLocal="loadLocal"
        :saveFile="saveFile"
        :loadFile="loadFile"
      >
      </slot>
    </template>
    <div class="d-flex align-center">
      <v-icon icon="mdi-alert-circle-outline" class="mr-1 mb-1" />
      <span>
        Unable to load save data. Save content may be corrupted or missing.
      </span>
    </div>
  </v-snackbar>
</template>
