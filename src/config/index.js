const validateEnv = require('../utils/validateEnv');

const env = validateEnv();

const CONFIG = {
  PROTOCOL: env.protocol,
  HOST: env.host,
  PORT: env.port,
  SERVER: `${env.protocol}://${env.host}:${env.port}`,
  isProduction: env.isProduction
};

module.exports = CONFIG;
