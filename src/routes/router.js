const { StatusCodes } = require('http-status-codes');

const CityRoute = require('./v1/city.router');
const { verifyAccessToken } = require('../middleware/validateAccessToken');

function initialize(app) {
  app.get(`/health-check`, (req, res) => {
    res.json({
      message: 'OK',
      uptime: process.uptime(),
      date: new Date()
    });
  });

  app.use(`/`, verifyAccessToken(), CityRoute);

  app.use((error, req, res, next) => {
    console.error(error);
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error?.message, stack: error?.stack });
  });
}

module.exports = { initializeRoutes: initialize };
