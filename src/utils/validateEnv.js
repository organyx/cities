const dotenv = require('dotenv-flow');
const { cleanEnv, port, str, host } = require('envalid');

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error('Could not find .env file');
}

const validateEnv = () =>
  cleanEnv(process.env, {
    NODE_ENV: str({
      devDefault: 'development',
      default: 'production'
    }),
    protocol: str({ default: 'http' }),
    host: host({ default: '127.0.0.1' }),
    port: port({ default: 8080 })
  });

module.exports = validateEnv;
