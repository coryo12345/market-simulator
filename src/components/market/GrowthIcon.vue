<script setup lang="ts">
import { computed } from 'vue';
import { Growth } from '../../models/market';

const props = defineProps<{
  growth: Growth;
}>();

const icon = computed(() => {
  const mapping = {
    [Growth.DECREASE_MAJOR]: 'mdi-chevron-triple-down',
    [Growth.DECREASE]: 'mdi-chevron-double-down',
    [Growth.DECREASE_MINOR]: 'mdi-chevron-down',
    [Growth.INCREASE_MINOR]: 'mdi-chevron-up',
    [Growth.INCREASE]: 'mdi-chevron-double-up',
    [Growth.INCREASE_MAJOR]: 'mdi-chevron-triple-up',
  };
  return mapping[props.growth];
});

const color = computed(() => {
  if (
    [Growth.DECREASE_MINOR, Growth.DECREASE, Growth.DECREASE_MAJOR].includes(
      props.growth,
    )
  ) {
    return 'red';
  } else {
    return 'green';
  }
});
</script>

<template>
  <v-icon :icon="icon" :color="color" />
</template>
