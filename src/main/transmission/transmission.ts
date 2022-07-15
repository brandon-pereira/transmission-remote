import { dialog, ipcMain } from 'electron';
import { ITorrent } from '../../types/ITorrent';
import Transmission from 'transmission-promise';
import { readFile } from 'fs/promises';
import store from '../store';
import normalizeTorrent from './normalizeTorrent';

export type ServerConfiguration = {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
};

let servers = store.get('transmission-servers');
if (!servers || !servers.length) {
  servers = [{ host: 'localhost', port: 9091 }];
  store.set('transmission-servers', servers);
}
// eslint-disable-next-line no-console
console.log('Connecting to Transmission with Settings:', servers[0]);

const transmission = new Transmission(servers[0]);

ipcMain.on('open-file-picker', async () => {
  const file = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Torrents', extensions: ['torrent'] }],
  });
  file.filePaths.map(async (filePath) => {
    const fileData = await readFile(filePath, { encoding: 'base64' });
    transmission.addBase64(fileData);
  });
});

ipcMain.on('transmission-get-files', async (event) => {
  const response = await transmission.all();
  const torrents = response.torrents as ITorrent[];
  if (!torrents || !Array.isArray(torrents)) {
    return;
  }
  event.reply('transmission-send-files', torrents.map(normalizeTorrent));
});
