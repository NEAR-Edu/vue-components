import { Account, Contract } from 'near-api-js';
import { reactive, toRef, toRefs } from 'vue';
import { ContractMethods, PrivateNearContractComposite } from './contract-types';

export function useNearContract(account: Account, contractId: string, options: ContractMethods) {
  const state = reactive({
    contract: null,
  }) as PrivateNearContractComposite;

  const loadContract = async () => {
    const contract = toRef(state, 'contract');
    contract.value = new Contract(account, contractId, options);
    if (!contract.value) {
      console.log(`no contract to match the contractId: ${contractId}`);
    }
  };

  loadContract();

  const callContract = async (methodName: string) => {
    const contract = toRef(state, 'contract');
    if (contract.value) {
      // contract.value?[methodName as keyof Contract]();
    }
  };

  return {
    ...toRefs(state),
    loadContract,
    callContract,
  };
}
