<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { useAppStore } from '../../stores/app';
import SaveState from './SaveState.vue';

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
      <save-state>
        <template #activator="{ save, load }">
          <v-list-item title="Save" @click="save"></v-list-item>
          <v-list-item title="Load" @click="load"></v-list-item>
        </template>
      </save-state>
    </v-list>
  </v-navigation-drawer>
</template>
