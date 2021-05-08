import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ripple from 'vuetify/lib/directives/ripple';

Vue.use(Vuetify, {
  directives: { ripple },
  options: {
    customProperties: true,
  },
});

const theme = {
  primary: '#3f51b5',
  secondary: '#333',
  info: '#555',
  success: '#4CAF50',
};

export default new Vuetify({
  breakpoint: { mobileBreakpoint: 800 },
  icons: {
    values: { expand: 'mdi-menu-down' },
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
});
