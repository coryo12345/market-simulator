<script setup lang="ts">
import { computed, ref } from 'vue';
import { LOCAL_STORAGE_KEY, SaveState } from '../../utils/SaveState';
import { useWalletStore } from '../../stores/wallet';
import { useMarketStore } from '../../stores/market';
import { useRouter } from 'vue-router';
import { useAppStore } from '../../stores/app';

const walletStore = useWalletStore();
const marketStore = useMarketStore();
const appStore = useAppStore();
const router = useRouter();

// backup
const hasPreviousSave = computed(
  () => typeof localStorage.getItem(LOCAL_STORAGE_KEY) === 'string',
);
function backupSave() {
  const saveState = new SaveState(walletStore, marketStore);
  saveState.loadFromLocalStorage(); // if this fails we'll just save the defaults
  saveState.saveToFile();
}

// starting money
const MIN_STARTING_MONEY = 0;
const MAX_STARTING_MONEY = 1000000;

const _startingMoney = ref(250000);
const startingMoney = computed({
  get() {
    return _startingMoney.value;
  },
  set(val) {
    _startingMoney.value = Math.max(
      MIN_STARTING_MONEY,
      Math.min(MAX_STARTING_MONEY, Math.floor(val)),
    );
  },
});

function startNewGame() {
  walletStore.$reset();
  marketStore.$reset();
  walletStore.money = startingMoney.value;
  const saveState = new SaveState(walletStore, marketStore);
  saveState.saveToLocalStorage();
  appStore.gameLoaded = true;
  router.push({ name: 'home' });
}
</script>

<template>
  <v-card v-if="hasPreviousSave" class="mb-4">
    <template #title>Previous Game</template>
    <template #text>
      <p>Starting a new game will delete your previously saved game.</p>
      <p>
        If you would like to back up your progess, press the button below to
        download a save file
      </p>
    </template>
    <template #actions>
      <v-btn
        class="ml-auto"
        color="primary"
        variant="outlined"
        @click="backupSave"
      >
        Download Save
      </v-btn>
    </template>
  </v-card>
  <v-card>
    <template #title>Start a New Game</template>
    <template #subtitle>This will start your game over</template>
    <template #text>
      <p>Starting money:</p>
      <v-slider
        v-model="startingMoney"
        :min="MIN_STARTING_MONEY"
        :max="MAX_STARTING_MONEY"
        :step="50000"
      >
        <template #append>
          <v-text-field
            v-model="startingMoney"
            type="number"
            density="compact"
            hide-details
            single-line
            style="width: 8em"
          />
        </template>
      </v-slider>
      <p v-if="startingMoney < 1000" class="text-red">
        Warning: your starting money is low, you may have a hard time getting
        started.
      </p>
    </template>
    <template #actions>
      <v-btn variant="outlined" class="ml-auto" :to="{ name: 'menu' }">
        Cancel
      </v-btn>
      <v-btn variant="flat" color="primary" @click="startNewGame">Start</v-btn>
    </template>
  </v-card>
</template>
