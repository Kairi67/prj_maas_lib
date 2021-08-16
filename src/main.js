import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { Auth0Plugin } from './plugins/auth0';

require('dotenv').config();

const domain = process.env.VUE_APP_AUTH0_DOMAIN;
const clientId = process.env.VUE_APP_AUTH0_CLIENT_ID;

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState) => {
    router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
