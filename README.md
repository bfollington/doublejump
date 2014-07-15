# Dependencies

`ruby`, `mongo`, `bundler`, `node`, `npm` are required. Install using homebrew, optionally use `rvm` to manage ruby.

Dependencies can be installed using `bundle install` for the Ruby app.

Node.js modules can be installed using `npm install`. For `gulp` to be available at the commandline you may need to run `npm install gulp -g`.

# Development

While working on the app, we will need three things:

- `padrino start` to run the app
- `mongod` to have mongo running locally
- `gulp watch` to build the javascript files automatically

SCSS files are recompiled on page load (if needed) so, always refresh the page before trying to deploy something. (We should work on this process).

# Deploying

A deploy can be triggered using `padrino rake deploy`, this runs through:

- Dump the live db to ./dumps/deploy_db_dump
- `padrino rake spec TESTING_DB=DEPLOY`
- If tests pass, enable maintenance mode
- Git push to heroku
- Migrate the deployed db
- Disable maintenance mode

# Database

## Dumping the Live DB

`padrino rake dump` will dump the remote db into ./dumps/manual_dump

## Dumping the Dev DB

`padrino rake dump_dev_db` will dump the remote db into ./dumps/development_db_dump

## Restoring the Live DB

### Restoring from the Deploy Backup

./dumps/deploy_db_dump -> prod `padrino rake restore_deploy_backup`

### Restoring from the Manual Backup

./dumps/manual_dump -> prod `padrino rake restore_dump`

## Restoring the Test DB

### Restoring from the Manual Backup

./dumps/manual_dump -> test `padrino rake populate_test_db`

## Restoring the Dev DB

### Restoring from Dev Backup

./dumps/development_db_dump -> dev `padrino rake restore_development_db`

### Restoring from Deploy Backup

./dumps/deploy_db_dump -> dev `padrino rake populate_development_db_deploy`

### Restoring from Manual Backup

./dumps/manual_dump -> dev `padrino rake populate_development_db`

# Migrations

Migrations are written in `migrations.rake`, to add a new one increment the version number by one and add a new method named `m_<VERSION>`. To run all migrations, use `padrino rake migrate`.

To migrate the test DB (rather than the dev or prod one) use `padrino rake migrate RACK_ENV=test`

# Testing

Testing is performed using RSpec and Capybara. Tests can be run using a copy of the dev db, a manual backup or a production clone:

## Running using dev

This is the most common way to work with the tests: `padrino rake spec`

This will dump the dev db, clone it into the test db, migrate it using the latest migrations, and test it.

## Running using manual

`padrino rake spec TESTING_DB=MANUAL`

This will take the dump stored at ./dumps/manual_dump and clone it into the test db, migrate it using the latest migrations, and test it.

## Running using production

`padrino rake spec TESTING_DB=DEPLOY`

This will take the dump stored at ./dumps/deploy_db_dump and clone it into the test db, migrate it using the latest migrations, and test it.

## Running without resetting the test DB

Not sure when or if we'll need this: `padrino rake spec TESTING_DB=FAST`

This just tests the current test db.