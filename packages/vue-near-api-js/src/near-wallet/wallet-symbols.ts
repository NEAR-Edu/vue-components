import { InjectionKey } from '@vue/runtime-core';
import { NearWalletComposable } from './wallet-types';
export const NearWalletContextSymbol: InjectionKey<NearWalletComposable> = Symbol('near-wallet-api');
