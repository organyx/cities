const express = require('express');
const CONFIG = require('./src/config');
const { initializeRoutes } = require('./src/routes/router');

const expressApp = express();

const initializeApp = app => {
  app.use(express.json({ limit: 1000000 }));
  app.use(express.urlencoded({ extended: true, limit: 1000000 }));
};

const start = async () => {
  try {
    initializeApp(expressApp);
    initializeRoutes(expressApp);

    expressApp.listen(CONFIG.PORT, () => {
      console.info(`-- Server started. Listening on port ${CONFIG.PORT} ---`);
    });

    process.on('unhandledRejection', reason => {
      console.error('Unhandled Rejection at:', reason.stack || reason);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
