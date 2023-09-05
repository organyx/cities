const { calculateDistance } = require('../utils/calculateDistance');
const { getCityData } = require('../utils/readData');
const path = require('path');

let pendingTasks = {};
let completedTasks = {};

const addresses = getCityData();

const getDistance = ({ from, to }) => {
  const fromAddress = addresses.find(address => address.guid === from);
  const toAddress = addresses.find(address => address.guid === to);

  if (!fromAddress || !toAddress) {
    return 0;
  }

  const distanceBetweenTwoPlaces = calculateDistance({ fromAddress, toAddress });

  return {
    to: { guid: toAddress.guid, latitude: toAddress.latitude, longitude: toAddress.longitude },
    from: { guid: fromAddress.guid, latitude: fromAddress.latitude, longitude: fromAddress.longitude },
    unit: 'km',
    distance: distanceBetweenTwoPlaces
  };
};

const getCitiesByTag = async ({ tag, isActive }) => {
  const activeCities = addresses.filter(address => {
    if (address.isActive === Boolean(isActive)) {
      return address;
    }
  });

  const citiesWithTag = activeCities.filter(address => {
    if (address.tags.includes(tag)) {
      return address;
    }
  });
  return citiesWithTag;
};

const getCitiesInArea = ({ from, distance }) => {
  const id = '2152f96f-50c7-4d76-9e18-f7033bd14428';

  pendingTasks[id] = true;

  const city = addresses.find(address => address.guid === from);
  const nearbyCities = [];

  for (const otherCity of addresses) {
    const distanceBetweenCities = calculateDistance({ fromAddress: city, toAddress: otherCity });
    if (distanceBetweenCities <= distance) {
      nearbyCities.push(otherCity);
    }
  }

  completedTasks[id] = nearbyCities;
  delete pendingTasks[id];

  return { resultId: id };
};

const getCitiesInAreaResult = async ({ id }) => {
  if (completedTasks[id]) {
    return completedTasks[id];
  }

  if (pendingTasks[id]) {
    return { status: 'pending' };
  }

  return { status: 'not found' };
};

const getAllCitiesPath = () => {
  const addressesPath = path.join(__dirname, '../../addresses.json');
  return addressesPath;
};

module.exports = {
  getDistance,
  getCitiesByTag,
  getCitiesInArea,
  getCitiesInAreaResult,
  getAllCitiesPath
};
