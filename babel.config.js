module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'inline-dotenv',
      [
        'module-resolver',
        {
          alias: {
            assets: './app/assets',
            api: './app/api',
            auth: './app/auth',
            components: './app/components',
            config: './app/config',
            hooks: './app/hooks',
            interfaces: './app/interfaces',
            logging: './app/logging',
            navigation: './app/navigation',
            screens: './app/screens',
          },
        },
      ],
    ],
  };
};
