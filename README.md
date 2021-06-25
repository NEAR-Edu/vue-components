# Installation

```sh
# install with yarn
yarn add @neardev/vue-use-near-api

# install with npm
npm install @neardev/vue-use-near-api
```

# Usage of wallet component

## Initialize near connection

near api require [initialization](https://docs.near.org/docs/develop/front-end/introduction#connection) to connect to near network.
To do this, you can use `initNear` function from vue-use-near-api package.
Don't forget the call of initNear must be come up before root component will be mounted and initNear will return promise.

```js
import { initNear } from '@neardev/vue-use-near-api';
const app = createApp(App);
const nearConfig = {
  ...getConfig('development'),
  appKeyPrefix: 'app',
  contractName: 'dev-1622023860692-5474128',
};
initNear(app, nearConfig).then(() => {
  app1.mount('#app');
});
```

for near configuration file, you can refer [this configuration example](https://github.com/near/create-near-app/blob/master/templates/vue/src/config.js)

## For multiple near sign in on the same page

currently, near api doesn't want to support multiple login on the same page, but you can try to implement it via this package.

```js
const app1 = createApp(App);
const nearConfig1 = {
  ...getConfig('development'),
  appKeyPrefix: 'app1',
  contractName: 'dev-1622023860692-5474128',
};
initNear(app1, nearConfig1).then(() => {
  app1.mount('#app1');
});

const nearConfig2 = {
  ...getConfig('development'),
  appKeyPrefix: 'app2',
  contractName: 'dev-1622023860692-5474128',
};

const app2 = createApp(App); // or maybe you can use another root component.
initNear(app2, nearConfig2).then(() => {
  app2.mount('#app2');
});
```

## Declarative Component

wallet component offers two styles to integrate near wallet api into your Vue.js app
Higher-order component(HOC) are better suited for most developers not familiar with composition api. Register the NearWallet components and use functions and data which are exported via v-slot.

```vue
<near-wallet #="{ isSignedIn, handleSignIn }">
  <div>
    <my-profile v-if="isSignedIn" />
    <my-button size="large" label="Log in" @click="handleSignIn" v-else />
  </div>
</near-wallet>
```

```js
import { NearWallet } from '@neardev/vue-use-near-api';

export default defineComponent({
  name: 'my-header',
  components: {
    MyButton,
    MyProfile,
    NearWallet,
  },
});
```

## Composition API

If you want more nice grained control, you can use `useNearWallet` function to compose near wallet logic into your component.

```js
import { useNearWallet } from '@neardev/vue-use-near-api';

export default defineComponent({
  components: {
    MyButton,
    MyProfile,
  },

  setup() {
    const { isSignedIn, handleSignIn, lastStatusCode } = useNearWallet();
    return {
      lastStatusCode,
      isSignedIn,
      handleSignIn,
    };
  },
});
```

Then, in your template, you can use functions and data as your demand.

```vue
<div>
  <my-profile v-if="isSignedIn" />
  <my-button size="large" label="Log in" @click="handleSignIn" v-else />
</div>
```

## State

The useNearWallet function exposes the following reactive state:

```js
import { useNearWallet } from '@neardev/vue-use-near-api';

const { 
  status, 
  lastStatusCode, 
  lastStatusMessage, 
  unitSymbol, 
  accountId, 
  amount, 
  formattedAmount, 
  isSignedIn 
} = useNearWallet();
```

| State             | Type                             | Description                                                                                                                                                                     |
|-------------------|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status            | `MaybeRef<NearWalletStatus>`     | Show the status of wallet. Below describe kinds of details.                                                                                                                     |
| lastStatusCode    | `MaybeRef<NearWalletStatusCode>` | Show the detail code of wallet status. Below describe kinds of details.<br> You can use this value to make your vue component to supply user-friendly view of the wallet status |
| lastStatusMessage | `MaybeRef<string>`               | Show the default status message of wallet.                                                                                                                                      |
| unitSymbol        | `MaybeRef<string>`               | Near symbol `Ⓝ`.                                                                                                                                                                 |
| accountId         | `MaybeRef<string>`               | Account id string. ex : sherif.testnet                                                                                                                                           |
| amount            | `MaybeRef<string>`               | The amount with native format of Near. ex : 199.997772695975                                                                                                                                     |
| formattedAmount   | `MaybeRef<string>`               | The human readable format of amount. ex : 199997772695975000000000000 |
| isSignedIn        | `MaybeRef<boolean>`              | Show whether logged in or not.                                                                                                                                                  |

## Methods

| Signature              | Description                       |
|------------------------|-----------------------------------|
| handleSignIn(void)     | Sign in near network.             |
| handleSignOut(void)    | Sign out from near network        |
| handleSyncAmount(void) | Sync amount of the wallet account |

## Types

[MaybeRef](https://github.com/KittyDragon88/vue-use-near-api/blob/master/packages/vue-near-api-js/src/types.ts)

[NearWalletStatus](https://github.com/KittyDragon88/vue-use-near-api/blob/master/packages/vue-near-api-js/src/near-wallet/wallet-types.ts)

* `SUCCESS`: last action has been successed.

* `LOADING`: last action is working.

* `ERROR`: last action has resulted in error.

[NearWalletStatusCode](https://github.com/KittyDragon88/vue-use-near-api/blob/master/packages/vue-near-api-js/src/near-wallet/wallet-types.ts)
  
  * `INITAL`: connection action has successed.
    - status will be `SUCCESS`.
    - lastStatusMessage will be empty string.

  * `CONNECTION_FAILED`: connection action has been failed.
    - status will be `ERROR`.
    - lastStatusMessage will be `invalid connection`

  * `SIGN_IN_FAILED`: sign in action has been failed.
    - status will be `ERROR`.
    - lastStatusMessage will be `error while signing in near network`

  * `SIGNING_IN`: sign in action is doing now on.
    - status will be `LOADING`.
    - lastStatusMessage will be `signing in near network`

  * `SIGNED_IN`:  sign in action has successed.
    - status will be `SUCCESS`.
    - lastStatusMessage will be `signed in to near network`

  * `SYNC_FAILED`: sync account action has been failed.
    - status will be `ERROR`.
    - lastStatusMessage will be `syncing with near account`

  * `SYNCING`:  sync account action is doing now on.
    - status will be `LOADING`.
    - lastStatusMessage will be `error while syncing with near account`

  * `SYNCED`:  sync account action has successed.
    - status will be `SUCCESS`.
    - lastStatusMessage will be `synced with near account`


# Build this repository

in root directory, please type following command.

```sh
npx lerna bootstrap
```

## Build package

```sh
yarn build
```

## Build example app

- Link local package with example

```sh
cd ./packages/vue-near-api-js
yarn link

cd ./packages/wallet-example-ts
yarn link @neardev/vue-use-near-api
```

- Build app.

  then, in root directory

```sh
yarn serve
```

- Issue

  just now, if you encounter eslint problem for files built in package, then please try again(yarn serve).
  I already add eslint ignore pattern for this, but it not working well, but I will try to fix it soon.

# Documentation

After finishing the components for near api, then documentation will be written for detailed description for functions and data supported by this package.

# Contributing

# License
