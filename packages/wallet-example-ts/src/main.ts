import { createApp } from 'vue';
import { initNear } from '@neardev/vue-use-near-api';
import App from './App.vue';
import './scss/tailwind.scss';

const app = createApp(App);
initNear(app).then(() => {
  app.mount('#app');
});
