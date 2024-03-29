<script setup lang="ts">
import { onMounted } from 'vue';
import SideNav from './components/app/SideNav.vue';
import { useAppStore } from './stores/app';
import { useMarketStore } from './stores/market';

const appStore = useAppStore();
const marketStore = useMarketStore();

onMounted(() => {
  marketStore.init();
});
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <template #prepend>
        <v-app-bar-nav-icon
          @click="appStore.showSideNav = !appStore.showSideNav"
        ></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>
        <router-link :to="{ name: 'home' }" class="header-text">
          MarketSim</router-link
        >
        <!-- MarketSim -->
      </v-app-bar-title>
    </v-app-bar>

    <side-nav />

    <v-main>
      <div class="pa-4">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.header-text {
  color: inherit;
  text-decoration: none;
}
</style>
