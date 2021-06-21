<template>
  <header>
    <div class="flex justify-end m-4">
      <div>
        <my-profile v-if="isSignedIn" />
        <my-button size="large" label="Log in" @click="handleSignIn" v-else />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import MyButton from './Button.vue';
import MyProfile from './Profile.vue';
import { useNearWallet } from '@neardev/vue-use-near-api';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'my-header',

  components: {
    MyButton,
    MyProfile,
  },

  setup() {
    const { isSignedIn, handleSignIn, lastStatusCode } = useNearWallet();
    return {
      lastStatusCode,
      isSignedIn,
      handleSignIn,
    };
  },
});
</script>
