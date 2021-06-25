import { ComputedRef, Ref } from 'vue';
export type MaybeRef<T> = Ref<T> | ComputedRef<T> | T;

export interface NearNetworkConfig {
  networkId: string;
  nodeUrl: string;
  contractName?: string;
  walletUrl?: string;
  helperUrl?: string;
  keyPath?: string;
  masterAccount?: string;
  explorerUrl?: string;
}
