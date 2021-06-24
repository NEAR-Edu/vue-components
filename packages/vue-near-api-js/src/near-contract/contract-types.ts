import { Contract } from 'near-api-js';
import { MaybeRef } from '../types';

export interface PrivateNearContractComposite {
  contract: MaybeRef<Contract | null>;
  loadContract(): void;
  callContract(): void;
}

// derived from near api library

export interface ContractMethods {
  changeMethods: string[];
  viewMethods: string[];
}

export type NearContractComposable = PrivateNearContractComposite;
