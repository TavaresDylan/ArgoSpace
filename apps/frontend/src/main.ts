import './styles.css';

import { createApp } from 'vue';
import App from './app/App.vue';
import Router from './app/router/routes';

const app = createApp(App);

app.use(Router).mount('#root');
