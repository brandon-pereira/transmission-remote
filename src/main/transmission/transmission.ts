import { app, dialog, ipcMain } from 'electron';
import Transmission from 'transmission-promise';
import { readFile } from 'fs/promises';
import { ITorrent } from '../../types/ITorrent';
import store from '../store';
import normalizeTorrent from './normalizeTorrent';
import {
  EVENT_OPEN_TORRENT_FILE_PICKER,
  STORE_REMOTES_SETTINGS,
} from './events';

export type ServerConfiguration = {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
};

let servers = store.get(STORE_REMOTES_SETTINGS);
if (!servers || !servers.length) {
  servers = [{ host: 'localhost', port: 9091 }];
  store.set(STORE_REMOTES_SETTINGS, servers);
}
// eslint-disable-next-line no-console
console.log('Connecting to Transmission with Settings:', servers[0]);

const transmission = new Transmission(servers[0]);

export async function addTorrentFromPath(filePath: string) {
  const fileData = await readFile(filePath, { encoding: 'base64' });
  transmission.addBase64(fileData);
}

ipcMain.on(EVENT_OPEN_TORRENT_FILE_PICKER, async () => {
  const file = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Torrents', extensions: ['torrent'] }],
  });
  file.filePaths.map(async (filePath) => {
    await addTorrentFromPath(filePath);
  });
});

app.setAsDefaultProtocolClient('magnet');

// Magnet Link Handler
app.on('open-url', (_event, url) => {
  transmission.addUrl(url);
});

app.on('open-file', async (_event, filePath) => {
  await addTorrentFromPath(filePath);
});

ipcMain.on('transmission-get-files', async (event) => {
  try {
    const response = await transmission.all();
    const torrents = response.torrents as ITorrent[];
    if (!torrents || !Array.isArray(torrents)) {
      return;
    }
    event.reply('transmission-send-files', torrents.map(normalizeTorrent));
  } catch (err) {
    event.reply('transmission-server-heath', 'UNHEALTHY');
  }
});

ipcMain.handle('transmission-start-torrents', async (_event, ids: string[]) => {
  return transmission.start(ids);
});

ipcMain.handle('transmission-stop-torrents', async (_event, ids: string[]) => {
  return transmission.stop(ids);
});
