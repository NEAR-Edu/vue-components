import * as NearAPI from 'near-api-js';
import { computed, onMounted, reactive, provide, inject, toRefs, toRef, watch, App, getCurrentInstance } from 'vue';
import { NearWalletComposable, NearWalletStatus, NearWalletStatusCode } from './types';
import getConfig from './config';
import { NearWalletContextSymbol } from './symbols';

const { connect, keyStores, WalletConnection, utils } = NearAPI;

declare global {
  interface Window {
    walletConnection: any;
    accountId: any;
  }
}

const nearConfig = getConfig(process.env.NODE_ENV || 'development');

export async function initNear(app: App): Promise<void> {
  console.log('initializing to connect near network');
  try {
    if (!app) {
      console.log('please call initNear after created App(root component) and before mounting it');
    }

    if (app.config.globalProperties.$walletConnection) {
      console.log('already connected to near network');
      return;
    }

    const near = await connect({
      ...nearConfig,
      deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() },
    });
    const walletConnection = new WalletConnection(near, null);
    app.config.globalProperties.$walletConnection = walletConnection;
    app.config.globalProperties.$accountId = walletConnection.getAccountId();
    console.log('near initialized successfully');
  } catch (e) {
    console.log('error while initializing');
    console.log('connect', e);
  }
}

export function useNearWallet(): NearWalletComposable {
  const internalInstance = getCurrentInstance();
  const walletConnection = internalInstance
    ? internalInstance.appContext.config.globalProperties.$walletConnection
    : null;
  const accountId = internalInstance ? internalInstance.appContext.config.globalProperties.$accountId : null;

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
  }) as NearWalletComposable;

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
    setStatus(NearWalletStatus.LOADING, NearWalletStatusCode.SIGNING_IN, 'signing in near network');
    connection.value
      .requestSignIn(nearConfig.contractName)
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
