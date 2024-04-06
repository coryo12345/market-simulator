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
      <save-state>
        <template #activator="{ saveLocal, loadLocal, loadFile, saveFile }">
          <v-list-item title="Save" @click="saveLocal" />
          <v-list-item title="Load" @click="loadLocal" />
          <v-list-item title="Save to File" @click="saveFile" />
          <v-list-item title="Upload Save from File" @click="loadFile" />
        </template>
      </save-state>
    </v-list>
  </v-navigation-drawer>
</template>
