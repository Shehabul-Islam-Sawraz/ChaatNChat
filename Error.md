1. Problem:
```node
node:internal/modules/cjs/loader:1050
  throw err;
  ^

Error: Cannot find module 'sequelize'

[nodemon] app crashed - waiting for file changes before starting...
```

**Solve:**

Looks like you install the cli in global node modules. You should also install the sequelize package along with sequelize-cli

if do it globally

```sh
npm install -g sequelize-cli
npm install -g sequelize
```

if do it locally

```sh
npm install --save sequelize-cli
npm install --save sequelize
```

And to save postgre: 
```sh
npm i --save pg -g
```