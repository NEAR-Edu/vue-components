<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <article>
      <!-- <my-header /> -->
      <my-header1 />
      <section>
        <h2 class="text-4xl font-black">Log in/Log out near network</h2>
        <p class="text-gray-900 mt-10 left-align">
          If you click login button, then this page try to log in near test network with dev contract id.<br />
          You will be redirected to https://wallet.testnet.near.org/ so that you can create new account or import
          existing one.<br />
          After succeeding, then page will be redirected here again.
        </p>
      </section>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from '@vue/runtime-core';
// import MyHeader from './components/Header.vue';
import MyHeader1 from './components/Header.vue';

const App = defineComponent({
  components: {
    // MyHeader,
    MyHeader1,
  },
  setup() {
    const app = getCurrentInstance();
    console.log('wallet app', app?.appContext.config.globalProperties);
  },
});

export default App;
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
