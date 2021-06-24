import { Account, Near } from 'near-api-js';
import { MaybeRef } from '../types';

export interface PrivateNearAccountComposite {
  account: MaybeRef<Account | null>;
  near: MaybeRef<Near | null>;
  loadAccount(): Promise<void>;
  createAccount(accountName: string, publicKey: string, intialBalance: string): Promise<void>;
  deleteAccount(accountName: string): Promise<void>;
  getAccountBalance(): Promise<void>;
  getAccountDetails(): Promise<void>;
  sendMoney(recevierId: string, amount: string): Promise<void>;
  getState(): Promise<void>;
}

export type NearAccountComposable = PrivateNearAccountComposite;
