import Constants from 'expo-constants';

let API_URL, API_TOKEN;

let releaseChannel = Constants.manifest.releaseChannel;

if (releaseChannel === undefined) {
  API_URL = process.env.API_URL;
  API_TOKEN = process.env.API_TOKEN;
} else if (releaseChannel.indexOf('production') !== -1) {
  API_URL = process.env.PRODUCTION_API_URL;
  API_TOKEN = process.env.PRODUCTION_API_TOKEN;
} else if (releaseChannel.indexOf('staging') !== -1) {
  API_URL = process.env.STAGING_API_URL;
  API_TOKEN = process.env.STAGING_API_TOKEN;
}

export default {
  API_URL,
  API_TOKEN,
};
