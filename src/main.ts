import { createApp } from 'vue';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import App from './App.vue';

import { vuetify } from './vuetify';
import { router } from './router';
import { createPinia } from 'pinia';

// @ts-ignore
import VueApexCharts from 'vue3-apexcharts';

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(vuetify);
app.use(VueApexCharts);

app.mount('#app');
