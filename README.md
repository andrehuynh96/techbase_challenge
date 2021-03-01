# techbase_challenge
Project for apply BE position TechBaseVN

## Source Code Structure

```
# NodeJs Project Structure
.
|-- app/
|   |-- config/
|   |   |-- index.js
|   |-- feature/
|   |   |-- token/
|   |   |   |-- token.controller.js
|   |   |   |-- token.route.js
|   |   |   |-- token.spec.js
|   |   |   |-- token.request-schema.js
|   |   |   |-- token.response-schema.js
|   |   |-- index.js
|   |-- lib/
|   |   |-- logger/
|   |-- middleware/
|   |   |-- validator.middleware.js
|   |-- model/
|   |   |-- user.js                 # Run after npm install
|-- package.json
|-- package-lock.json
|-- index.js
|-- server.js
|-- env.default                        # Default config for all env
|-- README.md
|-- .eslintrc.js
|-- .gitignore
```


## Configuration

> Zero Config
> https://12factor.net/config

- Separation of config from code
- Should store config in environment variables. It's easy to change between deploy
- Without changing any code
- Should ignore NODE_ENV variable
- Generally code modules to expect only a basic JavaScript **options** object passed in.

# Starting Project

### Create config file
Create `.env` file. Copy content from `.evn.default` into `.env`. Change config in `.env` corresponding to your environment

### Install package
```
npm instal
```

### Run
```
npm start
```
- Default server will be started at http://127.0.0.1:3001


### Testing
```
mocha path/test.spec
```
# Migration
When you want to change DB then you have to create migration file.

## Migration config
All configs related to migration in `.sequelizerc`


## Create Migration
- In order to create migration then you run command below
```
sequelize migration:create --name name-of-migration || npx sequelize-cli migration:create --name name-of-migration
```

- New file migration will be in `app/model/wallet/migration`

- The format of migration file
```javascript
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
```
- More commands please look at https://sequelize.readthedocs.io/en/latest/docs/migrations/#the-cli
 jV3z2Hd8Vf8DixXu
