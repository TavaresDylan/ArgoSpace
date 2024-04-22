import './styles.css';

import { createApp } from 'vue';
import App from './app/App.vue';
import Router from './app/router/routes';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(Router).use(vuetify).mount('#root');
