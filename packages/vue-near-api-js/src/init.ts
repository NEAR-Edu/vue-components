import * as NearAPI from 'near-api-js';
import { App } from 'vue';
import { NearNetworkConfig } from './types';

const { connect, keyStores, WalletConnection } = NearAPI;

export async function initNear(app: App, nearConfig: NearNetworkConfig): Promise<void> {
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
    app.config.globalProperties.$config = nearConfig;
    app.config.globalProperties.$near = near;
    console.log('near initialized successfully');
  } catch (e) {
    // The connection function in near api js module, isn't going to return error when failed,
    // so I think there is no case which this code will be run.
    console.log('error while initializing');
    console.log('connect', e);
    throw new Error(e);
  }
}
