import { ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext) => {
  return {
    ...config,
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'deporunners',
            project: 'deporunners',
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
  };
};
