# Vue use near api

## Installation
  
  in root directory, please type following command.  
  ```sh
  npx lerna bootstrap
  ```

  ### Build package
  ```sh
  yarn build
  ```

  ### Build example app

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

## Usage of wallet component

### Initialize near connection

near api require [initialization](https://docs.near.org/docs/develop/front-end/introduction#connection) to connect to near network.
To do this, you can use `initNear` function from vue-use-near-api package.

```js
import { initNear } from '@neardev/vue-use-near-api';
initNear().then(() => {
  createApp(App).mount('#app');
});
```

### Declarative Component

wallet component offers two styles to integrate near wallet api into your Vue.js app
Higher-order component(HOC) are better suited for most developers not familiar with composition api. Register the NearWallet components and use functions and data which are exported via v-slot.

```vue
<near-wallet v-slot="isSignedIn, handleSignIn">
  <my-profile v-if="isSignedIn" />
  <my-button size="large" label="Log in" @click="handleSignIn" v-else />
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
### Composition API
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

# Documentation

After finishing the components for near api, then documentation will be written for detailed description for functions and data supported by this package.

# Contributing

# License
