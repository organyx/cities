const path = require('path');
const { readJSONSync } = require('fs-extra');

const addressesPath = path.join(__dirname, '../../addresses.json');

const getCityData = () => {
  const jsonData = readJSONSync(addressesPath);
  return jsonData;
};

module.exports = {
  getCityData
};
