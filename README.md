# Dependencies

`ruby`, `mongo`, `bundler`, `node`, `npm` are required. Install using homebrew, optionally use `rvm` to manage ruby.

Use Ruby 2.0.

Dependencies can be installed using `bundle install` for the Ruby app.

Node.js modules can be installed using `npm install`. For `gulp` to be available at the commandline you may need to run `npm install gulp -g`.

# Development

While working on the app, we will need three things:

- `padrino start` to run the app
- `mongod` to have mongo running locally
- `gulp watch` to build the javascript files automatically

SCSS files are recompiled on page load (if needed) so, always refresh the page before trying to deploy something. (We should work on this process).

There is, however, a shortcut for these under `gulp server` that boots everything into development mode.

# Database

## Dumping the Dev DB

`padrino rake dump_dev_db` will dump the remote db into ./dumps/development_db_dump

## Restoring the Dev DB

A database dump is provided with the submission, it can be found in the `dumps` folder.

### Restoring from Dev Backup

./dumps/development_db_dump -> dev `padrino rake restore_development_db`

# Migrations

Migrations are written in `migrations.rake`, to add a new one increment the version number by one and add a new method named `m_<VERSION>`. To run all migrations, use `padrino rake migrate`.
