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

createApp(App).use(router).use(pinia).use(vuetify).mount('#app');
