<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
import { Stock } from '../../models/market';
import { useWalletStore } from '../../stores/wallet';
import { formatMoney } from '../../utils';

const props = defineProps<{
  type: 'buy' | 'sell';
  stock: Stock;
}>();

const walletStore = useWalletStore();
const { smAndDown } = useDisplay();

const isDialogActive = ref(false);
watch(isDialogActive, () => {
  numShares.value = 0;
});

const icon = computed(() =>
  props.type === 'buy' ? 'mdi-cart-arrow-down' : 'mdi-cart-arrow-up',
);

const title = computed(() =>
  props.type === 'buy'
    ? 'Buy ' + props.stock.company.abbr
    : 'Sell ' + props.stock.company.abbr,
);

const numSharesMax = computed<number>(() => {
  if (props.type === 'buy') {
    return Math.min(
      Math.floor(walletStore.money / props.stock.currentPrice),
      props.stock.availableShares,
    );
  } else {
    return (
      walletStore.ownedStocks.find((s) => s.ticker === props.stock.company.abbr)
        ?.sharesOwned ?? 0
    );
  }
});

const _numShares = ref(0);
const numShares = computed<number>({
  get() {
    return _numShares.value;
  },
  set(val) {
    _numShares.value = Math.min(
      Math.max(0, Math.floor(val)),
      numSharesMax.value,
    );
  },
});

const cost = computed(() => numShares.value * props.stock.currentPrice);

function submit() {
  if (props.type === 'buy') {
    _submitBuy();
  } else if (props.type === 'sell') {
    _submitSell();
  }
  isDialogActive.value = false;
}

function _submitBuy() {
  walletStore.money -= props.stock.currentPrice * numShares.value;
  const stock = walletStore.ownedStocks.find(
    (s) => s.ticker === props.stock.company.abbr,
  );
  if (stock) {
    stock.sharesOwned += numShares.value;
  } else {
    walletStore.ownedStocks.push({
      ticker: props.stock.company.abbr,
      sharesOwned: numShares.value,
    });
  }
  props.stock.availableShares -= numShares.value;
}

function _submitSell() {
  walletStore.money += props.stock.currentPrice * numShares.value;
  const stock = walletStore.ownedStocks.find(
    (s) => s.ticker === props.stock.company.abbr,
  );
  if (stock) {
    stock.sharesOwned -= numShares.value;
    if (stock.sharesOwned <= 0) {
      walletStore.ownedStocks = walletStore.ownedStocks.filter(
        (s) => s.ticker !== stock.ticker,
      );
    }
  }
  props.stock.availableShares += numShares.value;
}
</script>

<template>
  <v-dialog v-model="isDialogActive">
    <template #activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" :icon="icon" variant="plain"></v-btn>
    </template>
    <template #default>
      <v-card :title="title">
        <template #text>
          <h4>
            {{ props.stock.company.abbr }} ({{ props.stock.company.name }})
          </h4>
          <p class="mb-2">
            Current price: {{ formatMoney(props.stock.currentPrice) }}
          </p>
          <p class="text-caption">Number of shares to {{ props.type }}</p>
          <v-slider v-model="numShares" :min="0" :max="numSharesMax">
            <template #prepend>
              <v-btn
                v-if="!smAndDown"
                icon="mdi-chevron-double-left"
                density="comfortable"
                variant="text"
                @click="numShares = 0"
              />
              <v-btn
                icon="mdi-chevron-left"
                density="comfortable"
                variant="text"
                @click="numShares = Math.max(numShares - 1, 0)"
              />
            </template>
            <template #append>
              <v-btn
                icon="mdi-chevron-right"
                density="comfortable"
                variant="text"
                @click="numShares = Math.min(numShares + 1, numSharesMax)"
              />
              <v-btn
                v-if="!smAndDown"
                icon="mdi-chevron-double-right"
                density="comfortable"
                variant="text"
                class="mr-2"
                @click="numShares = numSharesMax"
              />
              <v-text-field
                v-model="numShares"
                density="compact"
                style="width: 100px"
                type="number"
                hide-details
                single-line
              />
            </template>
          </v-slider>
          <h4>Final Price</h4>
          <p v-if="props.type === 'buy'">
            You are about to purchase {{ numShares }} shares at a cost of
            {{ formatMoney(cost) }}
          </p>
          <p v-if="props.type === 'sell'">
            You are about to sell {{ numShares }} shares and will gain
            {{ formatMoney(cost) }}
          </p>
        </template>
        <template #actions>
          <div class="w-100 d-flex justify-end">
            <v-btn variant="tonal" @click="isDialogActive = false">
              Cancel
            </v-btn>
            <v-btn color="primary" variant="flat" @click="submit">
              Confirm
            </v-btn>
          </div>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
../../utils/utils
