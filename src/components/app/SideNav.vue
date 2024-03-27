<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { useAppStore } from '../../stores/app';

const appStore = useAppStore();
const { mobile } = useDisplay();
</script>

<template>
  <v-navigation-drawer
    location="left"
    v-model="appStore.showSideNav"
    :temporary="mobile"
  >
    <v-list>
      <v-list-item title="Navigation drawer"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
