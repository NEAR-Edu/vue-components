<template>
  <header>
    <div class="flex justify-end m-4">
      <near-wallet v-slot="{ isSignedIn, handleSignIn }">
        <div>
          <my-profile v-if="isSignedIn" />
          <my-button size="large" label="Log in" @click="handleSignIn" v-else />
        </div>
      </near-wallet>
    </div>
  </header>
</template>

<script lang="ts">
import MyButton from './Button.vue';
import MyProfile from './Profile.vue';
import { NearWallet } from '@neardev/vue-use-near-api';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'my-header1',

  components: {
    MyButton,
    MyProfile,
    NearWallet,
  },
});
</script>
