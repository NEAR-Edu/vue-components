<template>
  <!-- eslint-disable max-len -->
  <div class="">
    <div class="overlay fixed top-0 left-0 right-0 bottom-0" v-if="toggled" @click="onClick" />
    <div class="relative inline-block text-left">
      <div>
        <button
          type="button"
          class="
            inline-flex
            justify-center
            items-center
            w-full
            rounded-full
            border border-gray-300
            shadow-sm
            px-2
            py-1
            bg-white
            text-sm
            font-medium
            text-gray-700
            hover:bg-gray-50
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50
            space-x-4
          "
          @click="onClick"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="user-icon"
          >
            <path
              d="M9.24187 23.0625V22.0625C8.88424 22.0625 8.55384 22.2535 8.37534 22.5634C8.19684 22.8733 8.19743 23.2549 8.37688 23.5643L9.24187 23.0625ZM26.7582 23.0625L27.6232 23.5643C27.8027 23.2549 27.8033 22.8733 27.6248 22.5634C27.4463 22.2535 27.1159 22.0625 26.7582 22.0625V23.0625ZM24.0625 18C24.0625 15.5479 22.5854 13.3373 20.32 12.399L19.5547 14.2467C21.0727 14.8755 22.0625 16.3569 22.0625 18H24.0625ZM20.32 12.399C18.0546 11.4606 15.447 11.9793 13.7132 13.7132L15.1274 15.1274C16.2892 13.9655 18.0366 13.6179 19.5547 14.2467L20.32 12.399ZM13.7132 13.7132C11.9793 15.447 11.4606 18.0546 12.399 20.32L14.2467 19.5547C13.6179 18.0366 13.9655 16.2892 15.1274 15.1274L13.7132 13.7132ZM12.399 20.32C13.3373 22.5854 15.5479 24.0625 18 24.0625V22.0625C16.3569 22.0625 14.8755 21.0727 14.2467 19.5547L12.399 20.32ZM18 24.0625C21.3482 24.0625 24.0625 21.3482 24.0625 18H22.0625C22.0625 20.2437 20.2437 22.0625 18 22.0625V24.0625ZM18.0001 22.0625H9.24187V24.0625H18.0001V22.0625ZM8.37688 23.5643C10.3671 26.9952 14.0336 29.1071 18.0001 29.1071V27.1071C14.7467 27.1071 11.7393 25.3749 10.1069 22.5607L8.37688 23.5643ZM18.0001 29.1071C21.9665 29.1071 25.633 26.9952 27.6232 23.5643L25.8932 22.5607C24.2608 25.3749 21.2535 27.1071 18.0001 27.1071V29.1071ZM26.7582 22.0625H18.0001V24.0625H26.7582V22.0625Z"
              fill="#A2A2A8"
            ></path>
            <path
              d="M7.875 18C7.875 12.4081 12.4081 7.875 18 7.875C23.5919 7.875 28.125 12.4081 28.125 18"
              stroke="#A2A2A8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          {{ accountId }}
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        class="
          origin-top-right
          absolute
          p-4
          mt-2
          right-0
          w-72
          rounded-md
          shadow-lg
          bg-white
          ring-1 ring-black ring-opacity-5
          divide-y divide-gray-100
          focus:outline-none
        "
        role="menu"
        aria-orientation="vertical"
        tabindex="-1"
        v-if="toggled"
      >
        <h3 class="mb-2 text-gray-500">Account</h3>
        <div class="bg-blue-50 rounded-md p-2 flex justify-between items-center mb-6">
          <div>
            <div class="font-medium">
              {{ accountId }}
            </div>
            <div class="text-blue-700" v-if="!isSyncing">Ⓝ {{ formattedAmount }}</div>
            <div class="text-blue-700 animate-pulse" v-else>loading...</div>
          </div>
          <div class="w-5" @click="handleSyncAmount">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 496.156 496.156"
              style="enable-background: new 0 0 496.156 496.156"
              xml:space="preserve"
              :class="isSyncing ? 'animate-spin' : ''"
            >
              <path
                style="fill: #3974e8"
                d="M0,248.08C0,111.06,111.069,0.002,248.074,0.002c137.013,0,248.082,111.059,248.082,248.078  c0,137.005-111.069,248.074-248.082,248.074C111.069,496.154,0,385.085,0,248.08z"
              />
              <g>
                <path
                  style="fill: #ffffff"
                  d="M428.243,172.149c-10.348,0.023-20.694,0.054-31.042,0.077   c-23.272-52.177-68.95-89.871-126.649-98.91c-64.287-10.071-125.816,19.788-162.504,72.312   c-16.296,23.326,22.003,45.165,38.16,22.034c50.317-72.037,157.757-65.527,201.907,4.686c-9.559,0.022-19.118,0.046-28.678,0.068   c-2.674,0.008-4.574,1.197-5.749,2.877c-1.92,2.058-2.65,5.072-0.639,8.186c18.204,28.25,36.408,56.499,54.616,84.745   c3.061,4.747,9.663,4.708,12.696-0.046c18.062-28.338,36.126-56.675,54.188-85.013C437.538,178.48,433.602,172.135,428.243,172.149   z"
                />
                <path
                  style="fill: #ffffff"
                  d="M350.353,327.224c-49.927,71.49-156.108,65.63-200.886-3.049c9.161-0.022,18.322-0.046,27.484-0.068   c2.666-0.008,4.563-1.19,5.741-2.865c1.924-2.059,2.658-5.072,0.646-8.197c-18.2-28.246-36.405-56.499-54.609-84.741   c-3.056-4.751-9.662-4.712-12.695,0.046c-18.063,28.334-36.13,56.671-54.196,85.009c-2.987,4.689,0.948,11.032,6.308,11.017   c10.669-0.027,21.337-0.054,32.006-0.08c23.498,51.319,68.777,88.332,125.865,97.275c64.287,10.072,125.816-19.784,162.496-72.312   C404.806,325.928,366.508,304.09,350.353,327.224z"
                />
              </g>
            </svg>
          </div>
        </div>
        <button
          class="w-full h-12 text-white rounded-3xl bg-blue-700 hover:bg-blue-500 focus:outline-none"
          @click="handleSignOut"
        >
          Log out
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { NearWalletStatusCode, NearWalletContextSymbol, NearWalletComposable } from '@neardev/vue-use-near-api';
import { inject, defineComponent, ref, watch, Ref } from '@vue/runtime-core';

export default defineComponent({
  name: 'my-profile',
  setup() {
    const walletState: NearWalletComposable | undefined = inject(NearWalletContextSymbol, undefined);
    const lastStatusCode = walletState?.lastStatusCode;
    const isSyncing = ref(false);

    if (lastStatusCode) {
      watch(lastStatusCode as Ref<any>, code => {
        isSyncing.value = code === NearWalletStatusCode.SYNCING;
      });
    }

    // const walletState = useNearWalletStatus();

    return {
      isSyncing,
      handleSyncAmount: walletState?.handleSyncAmount,
      handleSignOut: walletState?.handleSignOut,
      accountId: walletState?.accountId,
      formattedAmount: walletState?.formattedAmount,
    };
  },
  data() {
    return {
      toggled: false,
      amount: '',
    };
  },
  methods: {
    onClick() {
      this.toggled = !this.toggled;
    },

    onBlur(e: MouseEvent) {
      e.preventDefault();
      this.toggled = false;
    },
  },
});
</script>
