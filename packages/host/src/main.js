import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { federationPlugin } from './plugins/federationPlugin';
import { getRemotes } from './routeManifest';
import store from "@/store/index.js";
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
  components,
  directives,
})


const app = createApp({
  name: 'Host',
  ...App,
});

app.use(router);

app.use(vuetify)

app.use(federationPlugin, getRemotes());

app.use(store)

app.mount('#app');
