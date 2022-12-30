import { BrowserWindow } from 'electron';
import createWindow, { navigate } from '../utils/createWindow';
import getMainWindow from './mainWindow';

let torrentSettingsWindow: BrowserWindow | null = null;

export async function createTorrentSettingsWindow(id: string) {
  const mainWindow = getMainWindow();
  if (!mainWindow) {
    return;
  }
  if (torrentSettingsWindow) {
    navigate(torrentSettingsWindow, `files/${id}`);
    return;
  }
  torrentSettingsWindow = await createWindow({
    windowOpts: {
      width: 700,
      height: 600,
      parent: mainWindow,
      titleBarStyle: 'hiddenInset',
    },
    route: `files/${id}`,
  });

  torrentSettingsWindow.on('closed', () => {
    torrentSettingsWindow = null;
  });
}

export default function getSettingsWindow() {
  return torrentSettingsWindow;
}
