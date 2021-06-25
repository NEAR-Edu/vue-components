import { createApp } from 'vue';
import { initNear } from '@neardev/vue-use-near-api';
import App from './App.vue';
import './scss/tailwind.scss';
import getConfig from './config';

const app1 = createApp(App);
const nearConfig1 = getConfig(process.env.NODE_ENV || 'development');
initNear(app1, nearConfig1).then(() => {
  app1.mount('#app1');
});

const nearConfig2 = getConfig('betanet');
const app2 = createApp(App);
initNear(app2, nearConfig2).then(() => {
  app2.mount('#app2');
});
