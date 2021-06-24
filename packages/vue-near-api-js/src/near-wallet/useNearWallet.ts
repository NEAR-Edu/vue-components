import * as NearAPI from 'near-api-js';
import { computed, onMounted, reactive, provide, inject, toRefs, toRef, watch, getCurrentInstance } from 'vue';
import {
  NearWalletComposable,
  NearWalletStatus,
  NearWalletStatusCode,
  PrivateNearWalletComposite,
} from './wallet-types';
import { NearWalletContextSymbol } from './wallet-symbols';

const { utils } = NearAPI;

declare global {
  interface Window {
    walletConnection: any;
    accountId: any;
  }
}
export function useNearWallet(): NearWalletComposable {
  const internalInstance = getCurrentInstance();
  const walletConnection = internalInstance
    ? internalInstance.appContext.config.globalProperties.$walletConnection
    : null;
  const accountId = internalInstance ? internalInstance.appContext.config.globalProperties.$accountId : null;
  const nearConfig = internalInstance ? internalInstance.appContext.config.globalProperties.$config : null;

  const state = reactive({
    status: NearWalletStatus.SUCCESS,
    lastStatusCode: NearWalletStatusCode.INITAL,
    lastStatusMessage: '',
    unitSymbol: 'Ⓝ',
    accountId: accountId,
    amount: '',
    formattedAmount: '',
    isSignedIn: false,
    rawConnection: walletConnection,
    config: nearConfig,
  }) as PrivateNearWalletComposite;

  const setStatus = (newStatus: NearWalletStatus, newCode: NearWalletStatusCode, newMessage: string) => {
    const { status, lastStatusCode, lastStatusMessage } = toRefs(state);
    status.value = newStatus;
    lastStatusCode.value = newCode;
    lastStatusMessage.value = newMessage;
  };

  onMounted(() => {
    const connection = toRef(state, 'rawConnection');
    if (!connection.value) {
      console.log(`warning in package, connection not established.
      please try to check you did call the initNear function globally`);
      setStatus(NearWalletStatus.ERROR, NearWalletStatusCode.CONNECTION_FAILED, 'invalid connection');
      return;
    }
    if (connection.value.isSignedIn()) {
      const isSignedIn = toRef(state, 'isSignedIn');
      isSignedIn.value = true;
      setStatus(NearWalletStatus.SUCCESS, NearWalletStatusCode.SIGNED_IN, 'signed in to near network');
      handleSyncAmount();
    } else {
      setStatus(NearWalletStatus.SUCCESS, NearWalletStatusCode.INITAL, '');
    }
  });

  const handleSignIn = () => {
    const connection = toRef(state, 'rawConnection');
    const nearConfig = toRef(state, 'config');
    setStatus(NearWalletStatus.LOADING, NearWalletStatusCode.SIGNING_IN, 'signing in near network');
    connection.value
      .requestSignIn(nearConfig.value.contractName)
      .then(() => {
        // // there's no need to make signed in flag to be true, because page will be refreshed.
        // const isSignedIn = toRef(state, 'isSignedIn');
        // isSignedIn.value = true;
        // setStatus(NearWalletStatus.SUCCESS, NearWalletStatusCode.SIGNED_IN, 'signed in to near network');
      })
      .catch((e: Error) => {
        console.log('handleSignIn', e);
        setStatus(NearWalletStatus.ERROR, NearWalletStatusCode.SIGN_IN_FAILED, 'error while signing in near network');
      });
  };

  const handleSignOut = () => {
    const connection = toRef(state, 'rawConnection');
    connection.value.signOut();
    // setStatus(NearWalletStatus.SUCCESS, NearWalletStatusCode.INITAL, '');
    // to render again.
    window.location.replace(window.location.origin + window.location.pathname);
  };

  function getAccountState(): Promise<any> {
    const connection = toRef(state, 'rawConnection');
    if (connection.value && connection.value.account()) {
      return connection.value.account().state();
    }
    return new Promise(resolve => {
      resolve(null);
    });
  }

  const handleSyncAmount = () => {
    setStatus(NearWalletStatus.LOADING, NearWalletStatusCode.SYNCING, 'syncing with near account');
    getAccountState()
      .then((res: any) => {
        setStatus(NearWalletStatus.SUCCESS, NearWalletStatusCode.SYNCED, 'synced with near account');
        const amount = toRef(state, 'amount');
        amount.value = res ? res.amount : '';
      })
      .catch(e => {
        console.log('getAccountState', e);
        setStatus(NearWalletStatus.ERROR, NearWalletStatusCode.SYNC_FAILED, 'error while syncing with near account');
      });
  };

  provide(NearWalletContextSymbol, {
    ...toRefs(state),
    handleSignIn,
    handleSignOut,
    handleSyncAmount,
  } as NearWalletComposable);

  const amount = toRef(state, 'amount');
  watch(amount, amount => {
    const formattedAmount = toRef(state, 'formattedAmount');
    formattedAmount.value = utils.format.formatNearAmount(amount);
  });

  return {
    ...toRefs(state),
    handleSignIn,
    handleSignOut,
    handleSyncAmount,
  } as NearWalletComposable;
}

export function useNearWalletStatus() {
  const walletState = inject(NearWalletContextSymbol);
  return computed(() => {
    return {
      status: walletState?.status,
      lastStatusCode: walletState?.lastStatusCode,
      lastStatusMessage: walletState?.lastStatusMessage,
    };
  });
}
