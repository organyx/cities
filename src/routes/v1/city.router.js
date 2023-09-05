const express = require('express');

const router = express.Router();
const CityController = require('../../controllers/city.controller');
const validate = require('../../middleware/validate');
const { citiesByTag, distance, area, areaResult } = require('../../valitation-schemas/cities.schema');

router.get('/cities-by-tag', validate(citiesByTag), CityController.getCitiesByTag);

router.get('/distance', validate(distance), CityController.getDistance);

router.get('/area', validate(area), CityController.getCitiesInArea);

router.get('/area-result/:id', validate(areaResult), CityController.getCitiesInAreaResult);

router.get('/all-cities', CityController.getAllCities);

module.exports = router;
