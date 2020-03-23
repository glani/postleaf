'use strict';

const Fs = require('fs');
// Environment
if (process.env.ENV_FILE_PATH && Fs.existsSync(process.env.ENV_FILE_PATH)) {
  require('dotenv').config({ path: process.env.ENV_FILE_PATH });
} else {
  // Make sure .env exists
  if (!Fs.existsSync(Path.join(__dirname, '.env'))) {
    throw new Error('Required config file .env is missing.');
  } else {
    require('dotenv').config();
  }
}

process.env.TZ = 'UTC';

// Node modules
const Chalk = require('chalk');
const Express = require('express');
const Path = require('path');
const Promise = require('bluebird');

// Local modules
const Postleaf = require(Path.join(__dirname, 'index.js'));

// Express app
const app = Express();

// Configuration options
const options = {
  databasePath: process.env.DATABASE_FILE_PATH || Path.join(__dirname, 'data/database.sq3'),
  themePath: process.env.THEMES_DIR_PATH || Path.join(__dirname, 'themes'),
  uploadPath: process.env.UPLOADS_DIR_PATH || Path.join(__dirname, 'uploads')
};

Promise.resolve()
  // Initialize Postleaf
  .then(() => Postleaf(app, options))
  .then(() => {
    // Start sailing! ⚓️
    app.listen(process.env.APP_PORT, process.env.APP_HOST || '::', () => {
      console.info('Postleaf publishing on port %d! 🌱', process.env.APP_PORT);
    });
  })
  .catch((err) => {
    console.error(
      Chalk.red('Error: ') + 'Postleaf failed to start! 🐛\n\n' +
      Chalk.red(err.stack)
    );
  });
