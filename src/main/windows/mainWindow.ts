import { BrowserWindow } from 'electron';
import createWindow from '../utils/createWindow';

let mainWindow: BrowserWindow | null = null;

export async function createMainWindow() {
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
  });
}

export default function getMainWindow() {
  return mainWindow;
}
