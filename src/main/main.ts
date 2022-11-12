import { app, ipcMain } from 'electron';
import './utils/store';
import './transmission/transmission';
import config from './config';
import getMainWindow, { createMainWindow } from './windows/mainWindow';

if (config.isProduction) {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (config.isDebug) {
  require('electron-debug')();
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
    createMainWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (getMainWindow() === null) createMainWindow();
    });
  })
  // eslint-disable-next-line no-console
  .catch(console.log);

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: filePath,
  });
});
