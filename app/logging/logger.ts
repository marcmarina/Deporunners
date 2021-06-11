import { env, isEnvDev } from 'config/env';
import Constants from 'expo-constants';

import * as Sentry from 'sentry-expo';

const start = () =>
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: isEnvDev() ? true : false,
    environment: env().ENV_NAME,
  });

const log = (error: any) => {
  const releaseChannel = Constants.manifest.releaseChannel;
  if (releaseChannel === undefined) {
    console.log(error);
  } else {
    Sentry.Native.captureException({ ...error });
  }
};

export default { log, start };
