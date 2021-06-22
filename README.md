# Vue use near api

## build
  in root directory, please type following command.
  npx lerna bootstrap

  ### build package
  yarn build

  ### build example app

  #### link local package with example
  cd ./packages/vue-near-api-js
  yarn link

  cd ./packages/wallet-example-ts
  yarn link @neardev/vue-use-near-api

  then, in root directory
  yarn serve

  just now, if you encounter eslint problem for files built in package, then please try again(yarn serve).
  I already add eslint ignore patter for this, but it not working well, but it will try to fix it soon.

## the usage of wallet component
