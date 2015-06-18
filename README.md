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
