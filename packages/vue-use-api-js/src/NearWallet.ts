import { defineComponent } from '@vue/runtime-core';
import { useNearWallet } from './useNearWallet';

export const NearWallet = defineComponent({
  name: 'near-wallet',
  setup(props, context) {
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
      };
    }
    return () => context.slots.default?.(slotProps());
  },
});
