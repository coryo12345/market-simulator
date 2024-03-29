<script setup lang="ts">
import SideNav from './components/app/SideNav.vue';
import { useAppStore } from './stores/app';

const appStore = useAppStore();
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <template #prepend>
        <v-app-bar-nav-icon
          @click="appStore.showSideNav = !appStore.showSideNav"
        ></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>MarketSim</v-app-bar-title>
    </v-app-bar>

    <side-nav />

    <v-main>
      <div class="pa-4">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>
