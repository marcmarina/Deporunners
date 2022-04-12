import { env, isEnvDev } from 'config';
import Constants from 'expo-constants';

import * as Sentry from 'sentry-expo';

const start = isEnvDev()
  ? () => undefined
  : () =>
      Sentry.init({
        dsn: env().SENTRY_DSN,
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
