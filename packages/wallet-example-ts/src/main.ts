import { createApp } from 'vue';
import App from './App.vue';
import { initNear } from '@neardev/vue-use-near-api';
import './scss/tailwind.scss';

initNear().then(() => {
  createApp(App).mount('#app');
});
