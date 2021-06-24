import { createApp } from 'vue';
import { initNear } from '@neardev/vue-use-near-api';
import App from './App.vue';
import './scss/tailwind.scss';
import getConfig from './config';

const app = createApp(App);
const nearConfig = getConfig(process.env.NODE_ENV || 'development');
initNear(app, nearConfig).then(() => {
  app.mount('#app');
});
