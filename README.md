# Transmission Remote

<img src="./assets/icon.png">

Transmission Remote is an desktop application which attempts to replicate the [Transmission](https://transmissionbt.com/) Mac App functionality for remote clients.

## Features

- 🎨 Similar design to [Transmission](https://transmissionbt.com/)
- 🪫 Powered by [Electron](https://www.electronjs.org/)
- ⚛ Leverages [React](https://reactjs.org/)
- 🎹 Automated Releases using GitHub actions

## Special Thanks

- [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) - Originally setup this Repo from their boilerplate.
- [yw4z for App Icon](https://dribbble.com/shots/13960981-Transmission-Big-Sur-Style-App-Icon)

## Initial Setup

```bash
npm install
```

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Running on Mac from GitHub Releases

🤮

```bash
 xattr -cr /Applications/Transmission\ Remote.app
```

## Releasing

```bash
1. Publish previous draft release
2. create a new **draft** release
3. yarn version --new-version 1.0.0-beta1 # or equivalent
```
