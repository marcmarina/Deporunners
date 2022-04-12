import * as Updates from 'expo-updates';

const releaseChannel = Updates.releaseChannel;

const envConfig = () => {
  switch (releaseChannel) {
    case 'production':
      return {
        ENV_NAME: 'production',
        API_URL: process.env.PRODUCTION_API_URL,
        API_TOKEN: process.env.PRODUCTION_API_TOKEN,
      };

    case 'staging':
      return {
        ENV_NAME: 'staging',
        API_URL: process.env.STAGING_API_URL,
        API_TOKEN: process.env.STAGING_API_TOKEN,
      };

    default:
      return {
        ENV_NAME: 'development',
        API_URL: process.env.API_URL,
        API_TOKEN: process.env.API_TOKEN,
      };
  }
};

const env = () => {
  return {
    SENTRY_DSN: process.env.SENTRY_DSN,
    ...envConfig(),
  };
};

export const isEnvDev = () => env().ENV_NAME === 'development';

export default env;
