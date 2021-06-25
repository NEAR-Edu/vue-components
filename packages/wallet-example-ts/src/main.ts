import { createApp } from 'vue';
import { initNear } from '@neardev/vue-use-near-api';
import App from './App.vue';
import './scss/tailwind.scss';
import getConfig from './config';

const app1 = createApp(App);
const nearConfig1 = {
  ...getConfig('development'),
  appKeyPrefix: 'app1',
  contractName: 'dev-1622023860692-5474128',
};
initNear(app1, nearConfig1).then(() => {
  app1.mount('#app1');
});

const nearConfig2 = {
  ...getConfig('development'),
  appKeyPrefix: 'app2',
  contractName: 'dev-1622023860692-5474128',
};

const app2 = createApp(App);
initNear(app2, nearConfig2).then(() => {
  app2.mount('#app2');
});
