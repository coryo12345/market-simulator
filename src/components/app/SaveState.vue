<script setup lang="ts">
import { useMarketStore } from '../../stores/market';
import { useWalletStore } from '../../stores/wallet';
import { SaveState } from '../../utils/SaveState';

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
  // TODO handle error
}
</script>

<template>
  <slot name="activator" :save="save" :load="load"></slot>
</template>
