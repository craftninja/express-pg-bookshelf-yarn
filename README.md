# README!

### Get this party started:

1. Fork, clone, npm install
1. Create database in PostgreSQL
  * `$ psql -d postgres`
  * `=# CREATE DATABASE yarn_app;`
1. Copy `.env.example` to `.env` and add your connection string (probably just `postgres://localhost/yarn_app`)
1. Migrate the database
  * `$ knex migrate:latest`
1. Start the server and start managing your yarn inventory in the browser
  * `$ DEBUG=yarn-app:* npm start`
  * [http://localhost:3000/](http://localhost:3000/)

### Tell me a story about this app...

Imagine that you need to do end of year inventory for your yarn store, Elegant Panther Yarns. Unfortunately you have no records and are starting from scratch. There are only a few details that you care about for now, namely yarn name, colorway, weight, yardage and ounces, and if it is discontinued. Name and colorway are strings, weight is an enum of 11 different standard sizes, yardage is an integer, ounces is a float, and discontinued is a boolean.

### How did you create such a lovely creature?

#### Generate express app
1. `$ express yarn-app`
1. `$ cd yarn-app`
1. Add README and take the most amazing notes on every step. Amazing.
1. `$ git init`, `$ git add -A`, and `$ git commit -m "Initial commit"`

#### Add ORM and database dependencies, npm install
1. Add PG, Bookshelf.js and Knex.js to our json package dependencies
  * "bookshelf": "~0.8.1",
  * "knex": "~0.8.6",
  * "pg": "~4.4.0",
1. `$ npm install`
1. Add a file `.gitignore` in the root directory with this content:

  ```
  node-modules
  npm-debug.log
  ```

1. Commit only the `.gitignore`
  * `$ git add .gitignore`
  * `$ git commit -m "Ignore node modules and any debug logs"`
1. `$ DEBUG=yarn-app:* npm start` and ensure the server successfully starts
  * If there is an error, check all previous code!
1. Visit [http://localhost:3000/](http://localhost:3000/), ensure the page loads, and the server continues running
  * New habit - if there is an error, check all previous code written between last successful load and this one... or note the error message that comes with not-yet-implemented functionality.
1. Commit

#### Connect to the PostgreSQL database
1. Add `.env` file to root of app with the following content:
  * `process.env.PG_CONNECTION_STRING = 'postgres://localhost/yarn_app';`
  * This file should automatically be ignored by git. IF NOT, add it immediately to your `.gitignore file` and commit. OR BETTER YET, add `.env` to your global gitignore ([LMGTFY](http://lmgtfy.com/?q=global+gitignore)).
1. Add `.env.example` file with the following content:
  * `process.env.PG_CONNECTION_STRING = 'your connection string here';`
  * This file is for anyone who forks and clones your project... they will copy `.env.example` to `.env` and replace example environmental variables with their actual variables.
1. Load `.env` in your app
  * In the top of your `app.js`, add `require('./.env')`
1. Add Bookshelf module `bookshelf.js` with the following content:

  ```
  var pg = require('knex')({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING
  });

  var bookshelf = require('bookshelf')(pg);

  module.exports = bookshelf;
  ```

1. Require bookshelf in app `var bookshelf = require('./bookshelf');`
1. Restart server - should be an error:
  * `Knex:Error Pool2 - error: database "yarn_app" does not exist`
1. Open PostgreSQL CLI and create database
  * Open a new terminal tab... leave this terminal tab open for future sql queries
  * `$ psql -d postgres`
  * `=# CREATE DATABASE yarn_app;`
1. Restart server and refresh browser.
1. Commit all the things (making sure that your `.env` file is still not being tracked by Git)

#### Create migration and migrate

1. `$ knex init`
  * If knex is not installed, run `$ npm install knex -g` to install CLI
  * This will create a `knexfile.js` in root of app. Require `.env` and alter export contents to only use PostgreSQL:

  ```
  require('./.env');

  module.exports = {

    development: {
      client: 'pg',
      connection: process.env.PG_CONNECTION_STRING
    }

  };
  ```

1. Create a migration template from the command line (this will use the file we just created with `$ knex init`):
  * `$ knex migrate:make createYarn`
  * Add the following to the `exports.up` code block to create the table:

    ```
    return knex.schema.createTable('yarns', function (table) {
      table.increments();
      table.string('name');
      table.string('colorway');
      table.enum('weight', [
        'thread',
        'cobweb',
        'lace',
        'light fingering',
        'fingering',
        'sport',
        'dk',
        'worsted',
        'aran',
        'bulky',
        'super bulky']);
      table.integer('yardage');
      table.float('ounces');
      table.boolean('discontinued');
      table.timestamps();
    });
    ```

  * And add this to the `exports.down` to drop the table in rollbacks:

    ```
    return knex.schema.dropTable('yarns');
    ```

1. Migrate any existing migrations (just the one created above in this case):
  * `$ knex migrate:latest`
  * Verify that the table has been created in PostgreSQL CLI:
    * `=# \c yarn_app`
    * `=# SELECT * FROM yarns;`
    * You should see an empty table
  * IF you ever need to rollback, `$ knex migrate:rollback`
1. Commit
