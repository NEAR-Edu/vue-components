import { WalletConnection } from 'near-api-js';
import { MaybeRef, NearNetworkConfig } from '../types';

export enum NearWalletStatus {
  SUCCESS = 1,
  LOADING,
  ERROR,
}

export enum NearWalletStatusCode {
  INITAL = 1,
  CONNECT_FAILED,
  CONNECTING,
  CONNECTED,
  SIGN_IN_FAILED,
  SIGNING_IN,
  SIGNED_IN,
  SYNC_FAILED,
  SYNCING,
  SYNCED,
}

export interface PrivateNearWalletComposite {
  accountId: MaybeRef<string>;
  amount: MaybeRef<string>;
  formattedAmount: MaybeRef<string>;
  status: MaybeRef<NearWalletStatus>;
  lastStatusCode: MaybeRef<NearWalletStatusCode>;
  lastStatusMessage: MaybeRef<string>;
  unitSymbol: MaybeRef<string>;
  isSignedIn: MaybeRef<boolean>;
  rawConnection: MaybeRef<WalletConnection>;
  config: NearNetworkConfig;
  handleSignOut(): void;
  handleSignIn(): void;
  handleSyncAmount(): void;
}

export type NearWalletComposable = Omit<PrivateNearWalletComposite, 'rawConnection' | 'config'>;
