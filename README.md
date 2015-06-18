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
