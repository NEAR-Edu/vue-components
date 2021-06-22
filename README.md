# Vue use near api

## installation
  in root directory, please type following command.  
  ```sh
  npx lerna bootstrap
  ```

  ### build package
  ```sh
  yarn build
  ```

  ### build example app

  #### link local package with example
  ```sh
  cd ./packages/vue-near-api-js
  yarn link
  
  cd ./packages/wallet-example-ts
  yarn link @neardev/vue-use-near-api
  ```

  then, in root directory
  ```sh
  yarn serve
  ```

  just now, if you encounter eslint problem for files built in package, then please try again(yarn serve).
  I already add eslint ignore pattern for this, but it not working well, but I will try to fix it soon.

## the usage of wallet component
