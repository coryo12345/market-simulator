<script setup lang="ts">
import { computed, ref } from 'vue';
import { SaveState, SaveStateData } from '../../utils/SaveState';
import { formatMoney } from '../../utils';
import { Time } from '../../models/time';
import { useWalletStore } from '../../stores/wallet';
import { useMarketStore } from '../../stores/market';
import { useRouter } from 'vue-router';
import { useAppStore } from '../../stores/app';

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const dialogValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

const walletStore = useWalletStore();
const marketStore = useMarketStore();
const appStore = useAppStore();
const router = useRouter();

const data = ref<SaveStateData | null>(null);
const timeStr = computed(() => {
  const t = new Time((data.value as any).globalTime.time);
  return t.toString();
});
const showFileErr = ref(false);

function processFile(e: Event) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const text = (e.target?.result as string) ?? '';
    try {
      data.value = JSON.parse(text);
      showFileErr.value = false;
    } catch (err) {
      showFileErr.value = true;
    }
  };
  reader.readAsText((e.target as any).files[0]);
}

function submitFile() {
  const save = new SaveState(walletStore, marketStore);
  save.loadFromFile(data.value);
  appStore.gameLoaded = true;
  router.push({ name: 'home' });
  dialogValue.value = false;
}
</script>

<template>
  <v-dialog v-model="dialogValue">
    <template #default>
      <v-card title="Upload a save file">
        <template #text>
          <input type="file" @change.prevent="processFile" />
          <p v-if="showFileErr">
            Unable to process uploaded file. You may have uploaded the inccorect
            file.
          </p>
          <div v-else-if="data">
            <p>Day: {{ timeStr }}</p>
            <p>Money: {{ formatMoney(data.wallet.money) }}</p>
          </div>
        </template>
        <template #actions>
          <v-btn
            :disabled="showFileErr || !data"
            color="primary"
            variant="flat"
            class="ml-auto"
            @click="submitFile"
          >
            Load Save
          </v-btn>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
