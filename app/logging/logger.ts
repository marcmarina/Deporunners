import Constants from 'expo-constants';

import * as Sentry from 'sentry-expo';

const start = () =>
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
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
