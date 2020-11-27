# Deporunners - App
This is one of the two front-end apps for this project. The other two are the [website][web] and [API][api].

## Setup
Requirements:
* `yarn`
* [expo-cli](https://www.npmjs.com/package/expo-cli)
* The [API][api] properly set up and running.
* Expo Client installed on your phone (or emulator): [iOS](https://apps.apple.com/us/app/expo-client/id982107779), [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US).

To set up the project, install dependencies using `yarn` and create a `.env` file using the provided example.

### `.env`
`API_URL` is the url of your locally running API. Keep in mind that it needs to be your local IP if you want to use it on your phone (e.g. `http://192.168.1.52:8080`).

`API_TOKEN` is the token you have set up for your API.

The other variations of these two are used when publishing or building with Expo, you don't need to specify them.

`SENTRY_` variables are used for error logging with [Sentry](https://sentry.io), no need to set them.

### Serving
```
yarn start
```

> If you change an environment variable you have to clean the cache for it to take effect, you can do so with `yarn start -c`.

Now scan the displayed QR code with your Expo Client app.

[api]: https://github.com/marcmarina/api.deporunners.cat
[web]: https://github.com/marcmarina/gestor.deporunners.cat
