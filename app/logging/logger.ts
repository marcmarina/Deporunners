import * as Sentry from 'sentry-expo';

const start = () =>
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
  });

const log = (error: any) => Sentry.Native.captureException(error);

export default { log, start };
