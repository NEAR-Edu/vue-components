import { Near } from 'near-api-js';
import { getCurrentInstance, reactive, toRef, toRefs, unref } from 'vue';
import { NearAccountComposable, PrivateNearAccountComposite } from './account-types';

export function useNearAccount(accountId: string): NearAccountComposable {
  const internalInstance = getCurrentInstance();
  const near = internalInstance ? internalInstance.appContext.config.globalProperties.$near : null;
  if (!near) {
    console.log(`you can't use near account without initializing`);
  }

  const state = reactive({
    account: null,
    near: near,
  }) as PrivateNearAccountComposite;

  const loadAccount = async (): Promise<void> => {
    const account = toRef(state, 'account');
    if (state.near) {
      try {
        account.value = await (unref(state.near) as Near).account(accountId);
      } catch (e) {
        console.log('error in loadAccount', e);
      }
    } else {
      console.log(`you can't call loadAccount method without near connection`);
    }
  };

  const createAccount = async (accountName: string, publicKey: string, intialBalance: string): Promise<void> => {
    const account = toRef(state, 'account');
    if (account && unref(account.value)) {
      try {
        const executionOutcome = await unref(account.value!).createAccount(accountName, publicKey, intialBalance);
        console.log(executionOutcome);
      } catch (e) {
        console.log('error in createAccount', e);
      }
    } else {
      console.log(`you can't call createAccount method without near connection`);
    }
  };

  const deleteAccount = async (accountName: string): Promise<void> => {
    const account = toRef(state, 'account');
    if (account && unref(account.value)) {
      try {
        const executionOutcome = await unref(account.value!).deleteAccount(accountName);
        console.log(executionOutcome);
      } catch (e) {
        console.log('error in deleteAccount', e);
      }
    } else {
      console.log(`you can't call deleteAccount method without near connection`);
    }
  };

  const getAccountBalance = async () => {
    const account = toRef(state, 'account');
    if (account && unref(account.value)) {
      try {
        const balance = await unref(account.value!).getAccountBalance();
        console.log(balance);
      } catch (e) {
        console.log('error in getAccountBalance', e);
      }
    } else {
      console.log(`you can't call getAccountBalance method without near connection`);
    }
  };

  const getAccountDetails = async () => {
    const account = toRef(state, 'account');
    if (account && unref(account.value)) {
      try {
        const { authorizedApps } = await unref(account.value!).getAccountDetails();
        console.log(authorizedApps);
      } catch (e) {
        console.log('error in getAccountDetails', e);
      }
    } else {
      console.log(`you can't call getAccountDetails method without near connection`);
    }
  };

  const sendMoney = async (recevierId: string, amount: string) => {
    const account = toRef(state, 'account');
    if (account && unref(account.value)) {
      try {
        const executionOutcome = await unref(account.value!).sendMoney(recevierId, amount);
        console.log(executionOutcome);
      } catch (e) {
        console.log('error in sendMoney', e);
      }
    } else {
      console.log(`you can't call sendMoney method without near connection`);
    }
  };

  const getState = async () => {
    const account = toRef(state, 'account');
    if (account && unref(account.value)) {
      try {
        const accountView = await unref(account.value!).state();
        console.log(accountView);
      } catch (e) {
        console.log('error in getState', e);
      }
    } else {
      console.log(`you can't call getState method without near connection`);
    }
  };

  return {
    ...toRefs(state),
    loadAccount,
    createAccount,
    deleteAccount,
    getAccountBalance,
    getAccountDetails,
    sendMoney,
    getState,
  } as NearAccountComposable;
}
