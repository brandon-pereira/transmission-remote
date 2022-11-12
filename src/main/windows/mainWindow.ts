import { BrowserWindow } from 'electron';
import createWindow from '../utils/createWindow';
import MenuBuilder from '../utils/menu';

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

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
}

export default function getMainWindow() {
  return mainWindow;
}
