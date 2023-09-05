const fs = require('fs-extra');
const { StatusCodes } = require('http-status-codes');
const CityService = require('../services/city.service');
const CONFIG = require('../config');

module.exports = {
  getDistance: (req, res, next) => {
    try {
      const { from, to } = req.query;
      const data = CityService.getDistance({ from, to });

      res.status(StatusCodes.OK).json({
        status: 'success',
        ...data
      });
    } catch (error) {
      next(error);
    }
  },
  getCitiesByTag: async (req, res, next) => {
    try {
      const { tag, isActive } = req.query;
      const cities = await CityService.getCitiesByTag({ tag, isActive });

      res.status(StatusCodes.OK).json({
        status: 'success',
        cities
      });
    } catch (error) {
      next(error);
    }
  },

  getCitiesInArea: (req, res, next) => {
    const { from, distance } = req.query;

    CityService.getCitiesInArea({ from, distance });

    res.status(StatusCodes.ACCEPTED).json({
      resultsUrl: `${CONFIG.SERVER}/area-result/2152f96f-50c7-4d76-9e18-f7033bd14428`
    });
  },

  getCitiesInAreaResult: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await CityService.getCitiesInAreaResult({ id });

      if (data.status === 'not found') {
        res.status(StatusCodes.NOT_FOUND).send();
      }

      if (data.status === 'pending') {
        res.status(StatusCodes.ACCEPTED).send();
      }

      res.status(StatusCodes.OK).json({
        cities: data
      });
    } catch (error) {
      next(error);
    }
  },
  getAllCities: async (req, res, next) => {
    try {
      const path = CityService.getAllCitiesPath();
      const readStream = fs.createReadStream(path);
      readStream.pipe(res);
    } catch (error) {
      next(error);
    }
  }
};
