<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { LOCAL_STORAGE_KEY } from '../utils/SaveState';

const links = shallowRef<
  {
    href: string;
    title: string;
    icon: string;
  }[]
>([
  {
    title: 'Start New Game',
    href: '/load/new',
    icon: 'mdi-new-box',
  },
  {
    title: 'Load Previous Save',
    href: '/load/continue',
    icon: 'mdi-reload',
  },
  {
    title: 'Load Save From File',
    href: '/load/fromFile',
    icon: 'mdi-file-upload-outline',
  },
]);

const availableLinks = computed(() => {
  if (typeof localStorage.getItem(LOCAL_STORAGE_KEY) === 'string') {
    return links.value;
  } else {
    return links.value.filter((l) => l.href !== '/continue');
  }
});
</script>

<template>
  <v-row>
    <v-col
      v-for="(item, idx) in availableLinks"
      :key="idx"
      cols="12"
      sm="12"
      md="4"
    >
      <v-card :to="item.href" class="text-center">
        <template #title>{{ item.title }}</template>
        <template #text>
          <v-icon :size="42" :icon="item.icon" />
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>
