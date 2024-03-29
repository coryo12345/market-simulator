import { createApp } from 'vue';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import { router } from './router';
import { createPinia } from 'pinia';

// @ts-ignore
import VueApexCharts from 'vue3-apexcharts';

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(vuetify);
app.use(VueApexCharts);

app.mount('#app');
