// Vuetify
import 'vuetify/styles';
import { ThemeDefinition, createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const appTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#f3f2f9',
    surface: '#FFFFFF',
    primary: '#1867C0',
    secondary: '#48A9A6',
    success: '#4CAF50',
    warning: '#FB8C00',
    error: '#B00020',
    info: '#2196F3',
  },
};

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'appTheme',
    themes: {
      appTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
