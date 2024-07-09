# Core Push Notifications

[![npm version](https://badge.fury.io/js/@universal-packages%2Fcore-push-notifications.svg)](https://www.npmjs.com/package/@universal-packages/core-push-notifications)
[![Testing](https://github.com/universal-packages/universal-core-push-notifications/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-core-push-notifications/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-core-push-notifications/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-core-push-notifications)

[Redis](https://github.com/push-notifications/node-push-notifications) universal-core module abstraction.

## Install

```shell
npm install @universal-packages/core-push-notifications

npm install @universal-packages/core
```

## Initialization

```shell
ucore initialize push-notifications
```

## Global

Core expose `PushNotifications` instance as the global subject if core `modulesAsGlobals` config is true.

```js
pushNotificationsSubject.pushNotification([token], { title: 'Message', body: 'From your SO' })
```

```js
core.coreModules.pushNotificationsModule.subject.pushNotification([token], { title: 'Message', body: 'From your SO' })
```

## Typescript

In order for typescript to see the global types you need to reference the types somewhere in your project, normally `./src/globals.d.ts`.

```ts
/// <reference types="@universal-packages/core-push-notifications" />
```

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
