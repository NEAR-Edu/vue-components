import { defineComponent } from '@vue/runtime-core';
import { useNearWallet } from './useNearWallet';
import { unref } from 'vue';

export const NearWallet = defineComponent({
  name: 'near-wallet',
  setup(props, { slots }) {
    const {
      status,
      lastStatusCode,
      lastStatusMessage,
      unitSymbol,
      accountId,
      amount,
      formattedAmount,
      isSignedIn,
      handleSignOut,
      handleSignIn,
      handleSyncAmount,
    } = useNearWallet();

    function slotProps() {
      return {
        status: unref(status),
        lastStatusCode: unref(lastStatusCode),
        lastStatusMessage: unref(lastStatusMessage),
        unitSymbol: unref(unitSymbol),
        accountId: unref(accountId),
        amount: unref(amount),
        formattedAmount: unref(formattedAmount),
        isSignedIn: unref(isSignedIn),
        handleSignOut,
        handleSignIn,
        handleSyncAmount,
      };
    }
    return () => slots.default?.(slotProps());
  },
});
