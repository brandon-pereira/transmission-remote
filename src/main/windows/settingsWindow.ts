import { BrowserWindow } from 'electron';
import createWindow from '../utils/createWindow';
import MenuBuilder from '../utils/menu';
import getMainWindow from './mainWindow';

let settingsWindow: BrowserWindow | null = null;

export async function createSettingsWindow() {
  const mainWindow = getMainWindow();
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
}

export default function getSettingsWindow() {
  return settingsWindow;
}
