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

#### User can visit `/yarns`

1. Add '/yarns' link to root page `views/index.jade`
  * `a(href='/yarns') Check out my awesome yarn inventory`
1. Stop and restart the server, and refresh browser. Click link. Note what your error message looks like when you do not have a route. Look at the server logs, and note the 404 for `GET /yarns`
1. In `app.js`:
  * Change `var users = require('./routes/users');` to `var yarns = require('./routes/yarns');`
  * Change `app.use('/users', users);` to `app.use('/yarns', yarns);`
1. In `routes` folder, change filename `users.js` to `yarns.js`
1. In `yarns.js`, only route should be changed to:

  ```
  router.get('/', function(req, res, next) {
    res.render('yarns/index');
  });
  ```

1. Stop and restart your server, and visit [http://localhost:3000/](http://localhost:3000/). Click link. Note what your error message looks like when you do not have a view. Look at the server logs, and note the 500 for `GET /yarns`.
1. Add view for yarns index:
  * Create file `views/yarns/index.jade`

    ```
    extends ../layout

    block content

      h1(class='page-header') Yarn inventory

      table(class='table')
        thead
          th Name
          th Colorway
          th Weight
          th Yardage
          th Ounces
          th
        tbody
          tr
            td
            td
            td
            td
            td
            td
    ```

1. Stop and restart your server, and visit [http://localhost:3000/](http://localhost:3000/). Click link. Page is loading! Check server logs to see what that looks like as well.
1. Commit

#### User can see yarns in database listed on yarns index

1. Add one skein of yarn to database through PostgreSQL CLI:
  * `INSERT INTO yarns(name, colorway, weight, yardage, ounces, discontinued) VALUES ('Madeline Tosh Merino Light', 'Edison Bulb', 'fingering', 420, 3.5, false);`
1. Change yarn index to loop through yarns:

  ```
  tbody
    each yarn in yarns
      tr
        td= yarn.name
        td= yarn.colorway
        td= yarn.weight
        td= yarn.yardage
        td= yarn.ounces
        td= yarn.discontinued ? "Discontinued" : ""
  ```

1. Pass yarns from `routes/yarns.js` file to view (`yarns` does not yet reference anything...)

  ```
  res.render('yarns/index', {yarns: yarns});
  ```

1. Add model 'app/models/yarn.js' with the following content:

  ```
  var bookshelf = require('../../bookshelf');

  var Yarn = bookshelf.Model.extend({
      tableName: 'yarns'
  });

  module.exports = Yarn;
  ```

1. Require model in the `routes/yarns.js` file:
  * `var Yarn = require('../app/models/yarn');`
1. Add Yarn query to route, saving result to `yarns`:

  ```
  router.get('/', function(req, res, next) {
    Yarn.collection().fetch().then(function(yarns) {
      res.render('yarns/index', {yarns: yarns.toJSON()});
    });
  });
  ```

1. Stop and restart your server, and visit [http://localhost:3000/yarns](http://localhost:3000/yarns).
1. Commit

#### Add bootstrap
1. Go to [http://getbootstrap.com/getting-started/#download](http://getbootstrap.com/getting-started/#download) and click on "Download Bootstrap" (zip file)
1. Unzip, and rename file to just `bootstrap`
1. Move this directory to `/public`
1. Restart server and open [http://localhost:3000/](http://localhost:3000/)
1. Require bootstrap in `/views/layout/jade`, contents of head should be:

  ```
  title= title
  link(rel='stylesheet', href='/bootstrap/css/bootstrap.min.css')
  link(rel='stylesheet', href='/stylesheets/style.css')
  script(src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js')
  script(src='/bootstrap/js/bootstrap.min.js')
  ```

1. Refresh index... you should see the font change. Bootstrap is now loading!
1. Commit all bootstrap files, then commit the rest of the diffs

#### User can add new yarns to inventory
1. Add a new yarn button to yarn index:

  ```
  div(class='page-header')
    a(href='/yarns/new' class='btn btn-success pull-right') Add New Yarn
    h1 Yarn inventory
  ```

  * click it... see what happens...
1. Add route to `routes/yarns.js`:

  ```
  router.get('/new', function(req, res, next) {
    res.render('yarns/new');
  });
  ```

  * Restart your server... click that button again... see what happens...

1. Add `views/yarns/new.jade` with content:

  ```
  extends ../layout

  block content
    h1(class="page-header") New Yarn

    ol(class="breadcrumb")
      li
        a(href="/yarns") My Yarn Inventory
      li(class="active") New

    form(action='/yarns' method='post' class='form-horizontal')

      div(class='form-group')
        label(class="col-md-2 control-label") Name
        div(class='col-md-4')
          input(type="text" name="yarn[name]" class='form-control')

      div(class='form-group')
        label(class="col-md-2 control-label") Colorway
        div(class='col-md-4')
          input(type="text" name="yarn[colorway]" class='form-control')

      div(class="form-group")
        label(class="col-md-2 control-label") Weight (in)
        div(class="col-md-4")
          select(name='yarn[weight]' class="form-control")
            option(value="thread") thread
            option(value="cobweb") cobweb
            option(value="lace") lace
            option(value="light fingering") light fingering
            option(value="fingering") fingering
            option(value="sport") sport
            option(value="dk") dk
            option(value="worsted") worsted
            option(value="aran") aran
            option(value="bulky") bulky
            option(value="super bulky") super bulky

      div(class="form-group")
        label(class="col-md-2 control-label") Yardage
        div(class="col-md-4")
          input(type='number' name='yarn[yardage]' class="form-control")

      div(class="form-group")
        label(class="col-md-2 control-label") Ounces
        div(class="col-md-4")
          input(type='number' step=0.05 name='yarn[ounces]' class="form-control")

      div(class="form-group")
        div(class="col-md-offset-2 col-md-4")
          div(class="checkbox")
          label Discontinued?
            input(type='checkbox' name='yarn[discontinued]' class="form-control")

      div(class="form-group")
        div(class="col-md-offset-2 col-md-4")
          input(type='submit' name='commit' value='Add this yarn' class="btn btn-success")
  ```

  * what happens when you fill out the form and push submit button?

1. Add route for creation of new yarn in `routes/yarns.js`:

  ```
  router.post('/', function(req, res, next) {
    Yarn.forge({
      name: req.body['yarn[name]'],
      content: req.body['yarn[content]'],
      width_in_inches: req.body['yarn[width_in_inches]'],
      yardage_available: req.body['yarn[yardage_available]'],
      domestic: req.body['yarn[domestic]']
    })
    .save()
    .then(function(yarn) {
      res.redirect('/yarns');
    })
    .catch(function(err) {
      return console.error(err);
    });
  });
  ```

  * restart server (EVERY TIME you alter anything other than a view)
1. Add a new Yarn through your beautifully styled form and BOOM.
1. Commit

#### User can update yarn inventory

1. Add Edit button to yarn index

  ```
  td
    a(href="/yarns/#{yarn.id}/edit" class="btn btn-warning") Edit
  ```

  * Be sure and add an additional `<th>` to match the <td>... check out the style without and with this additional '<th>'. What is the difference?
  * Click the button. What are the error messages telling you?
1. Add edit route to `routes/yarns.js`

  ```
  router.get('/:id/edit', function(req, res, next) {
    new Yarn({id: req.params.id})
    .fetch()
    .then(function(yarn) {
      res.render('yarns/edit', {yarn: yarn.toJSON()});
    });
  });
  ```

  * Restart server and click the edit button again. What are the error messages telling you now?
1. Add edit view `views/yarns/edit.jade`:

  ```
  extends ../layout

  block content
    h1(class="page-header") Edit #{yarn.name}

    ol(class="breadcrumb")
      li
        a(href="/yarns") My Yarn Inventory
      li
        a(href="/yarns/#{yarn.id}")= yarn.name
      li(class="active") Edit

    form(action='/yarns/#{yarn.id}' method='post' class='form-horizontal')

      div(class='form-group')
        label(class="col-md-2 control-label") Name
        div(class='col-md-4')
          input(type="text" value=yarn.name name="yarn[name]" class='form-control')

      div(class='form-group')
        label(class="col-md-2 control-label") Colorway
        div(class='col-md-4')
          input(type="text" value=yarn.colorway name="yarn[colorway]" class='form-control')

      div(class="form-group")
        label(class="col-md-2 control-label") Weight (in)
        div(class="col-md-4")
          select(name='yarn[weight]' class="form-control")
            option(value=yarn.weight selected)= yarn.weight
            option(value="thread") thread
            option(value="cobweb") cobweb
            option(value="lace") lace
            option(value="light fingering") light fingering
            option(value="fingering") fingering
            option(value="sport") sport
            option(value="dk") dk
            option(value="worsted") worsted
            option(value="aran") aran
            option(value="bulky") bulky
            option(value="super bulky") super bulky

      div(class="form-group")
        label(class="col-md-2 control-label") Yardage
        div(class="col-md-4")
          input(type='number' value=yarn.yardage name='yarn[yardage]' class="form-control")

      div(class="form-group")
        label(class="col-md-2 control-label") Ounces
        div(class="col-md-4")
          input(type='number' step=0.05 value=yarn.ounces name='yarn[ounces]' class="form-control")

      div(class="form-group")
        div(class="col-md-offset-2 col-md-4")
          div(class="checkbox")
          label Discontinued?
            if yarn.discontinued
              input(type='checkbox' name='yarn[discontinued]' class="form-control" checked=yarn.discontinued)
            else
              input(type='checkbox' name='yarn[discontinued]' class="form-control")

      div(class="form-group")
        div(class="col-md-offset-2 col-md-4")
          input(type='submit' name='commit' value='Update this yarn' class="btn btn-success")
  ```

  * Note we added a breadcrumb for a show page... we will implement this later
  * Fill it out and click the submit button. What is happening?
1. Add an update route:

  ```
  router.post('/:id', function(req, res, next) {
    new Yarn({
      id: req.params.id,
      name: req.body['yarn[name]'],
      colorway: req.body['yarn[colorway]'],
      weight: req.body['yarn[weight]'],
      yardage: req.body['yarn[yardage]'],
      yardage: req.body['yarn[yardage]'],
      ounces: req.body['yarn[ounces]'],
      discontinued: req.body['yarn[discontinued]']
    }).save().then(function(yarn) {
      res.redirect('/yarns');
    });
  });
  ```

1. Restart server, and verify functionality in browser
1. Commit!

#### User can delete yarns from inventory

1. Add delete button on yarns index
  * `a(href="/yarns/#{yarn.id}/delete" class="btn btn-danger") Delete`
1. Add delete route to yarns routes

  ```
  router.get('/:id/delete', function(req, res, next) {
    new Yarn({id: req.params.id})
    .destroy()
    .then(function(yarn) {
      res.redirect('/yarns');
    });
  });
  ```

1. Restart server and verify functionality in browser
1. Commit!

#### User can visit yarn show page

1. Change yarn name to link to yarn show page

  ```
  td
    a(href="/yarns/#{yarn.id}")= yarn.name
  ```

1. Add show route in yarn routes

  ```
  router.get('/:id', function(req, res, next) {
    new Yarn({id: req.params.id})
    .fetch()
    .then(function(yarn) {
      res.render('yarns/show', {yarn: yarn.toJSON()});
    });
  });
  ```

1. Add yarn show page with following content:

  ```
  extends ../layout

  block content
    div(class="page-header")
      div(class="pull-right")
        a(href='/yarns/#{yarn.id}/edit' class="btn btn-warning") Edit
        a(href='/yarns/#{yarn.id}/delete' class="btn btn-danger") Delete
      h1= yarn.name

    ol(class="breadcrumb")
      li
        a(href="/yarns") My Yarn Inventory
      li(class="active")= yarn.name

    dl(class="dl-horizontal")
      dt Yarn content
      dd= yarn.content
      dt Width (inches)
      dd= yarn.width_in_inches
      dt Yardage Available
      dd= yarn.yardage_available
      dt Domestic or Imported
      dd= yarn.domestic ? "Domestic" : "Imported"
  ```

1. Restart server and verify all functionality in browser. RESTfully CRUDtastic!
1. Commit!

#### Deploy to Heroku

1. Heroku uses the default environmental variable `DATABASE_URL` for the postgres connection string. Let's change our app to use this, and only load `.env` if that environmental variable isn't present.
  * `.env`
  * `.env.example`
  * `bookshelf.js`
  * `app.js`: `process.env.DATABASE_URL || require('./.env')`
  * `knexfile.js`: `process.env.DATABASE_URL || require('./.env')`
  * Restart your server and make sure app is still functional
1. Create a Heroku app, add the Heroku Postgres add-on, and add the SSH URL to your local app. Commit and push your code.
1. `$ heroku run knex migrate:latest`

### Ideas for expansion

1. Yarns belong to a brand (and brands can have many yarns), and yarns have many colorways
1. Yarns belong to patterns through project ideas
1. Yarns have a wholesale and retail price (accurate to pennies)
1. How would you go about making a "register" to take in quantities, calculate pricing, and ring people up? This would need to calculate tax and update inventory as well.
