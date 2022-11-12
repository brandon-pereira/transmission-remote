import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './utils/pathResolvers';
import './utils/store';
import './transmission/transmission';
import { EVENT_OPEN_SERVER_SETTINGS } from './transmission/events';
import AutoUpdater from './utils/autoUpdater';
import config from './config';
import createWindow from './utils/createWindow';
import { create } from 'domain';

let mainWindow: BrowserWindow | null = null;
let settingsWindow: BrowserWindow | null = null;

if (config.isProduction) {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (config.isDebug) {
  require('electron-debug')();
}

async function initMainWindow() {
  mainWindow = await createWindow({
    windowOpts: {
      show: false,
      width: 500,
      height: 728,
      titleBarStyle: 'hiddenInset',
    },
  });

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    settingsWindow?.close();
    settingsWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    initMainWindow();

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) initMainWindow();
    });
  })
  // eslint-disable-next-line no-console
  .catch(console.log);

ipcMain.on(EVENT_OPEN_SERVER_SETTINGS, async () => {
  if (!mainWindow) {
    return;
  }
  if (settingsWindow) {
    settingsWindow.show();
    return;
  }
  settingsWindow = await createWindow({
    windowOpts: {
      width: 400,
      height: 600,
      parent: mainWindow,
      resizable: false,
    },
    route: 'server-settings',
  });

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
});

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: filePath,
  });
});
