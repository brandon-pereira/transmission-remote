import { app, dialog, ipcMain } from 'electron';
import Transmission from 'transmission-promise';
import { readFile } from 'fs/promises';
import { ITorrent } from '../../types/ITorrent';
import { IServer, IServerHealth } from '../../types/IServer';

import store from '../store';
import normalizeTorrent from './normalizeTorrent';
import {
  EVENT_ADD_SERVER,
  EVENT_ADD_TORRENT_FROM_PATH,
  EVENT_DELETE_TORRENTS,
  EVENT_LIST_SERVERS,
  EVENT_LIST_TORRENTS,
  EVENT_OPEN_TORRENT_FILE_PICKER,
  EVENT_START_TORRENTS,
  EVENT_STOP_TORRENTS,
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
let transmission = new Transmission(servers[0]);

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

// File Double Click Handler
app.on('open-file', async (_event, filePath) => {
  await addTorrentFromPath(filePath);
});

ipcMain.handle(EVENT_ADD_SERVER, async (_event, server: IServer) => {
  const prev = store.get(STORE_REMOTES_SETTINGS);
  const next = [server, ...prev];
  const tempServer = new Transmission(server);
  await tempServer.sessionStats();
  store.set(STORE_REMOTES_SETTINGS, next);
  transmission = tempServer;
});

ipcMain.handle(EVENT_LIST_SERVERS, async () => {
  const raw = store.get(STORE_REMOTES_SETTINGS);
  const formatted: IServer[] = raw.map((server, i) => ({
    ...server,
    isDefault: i === 0,
    isActive: i === 0,
    health: IServerHealth.UNHEALTHY,
  }));
  return formatted;
});

// Renderer Requests Torrents List
ipcMain.handle(EVENT_LIST_TORRENTS, async () => {
  try {
    const response = await transmission.all();
    const torrents = response.torrents as ITorrent[];
    if (!torrents || !Array.isArray(torrents)) {
      return [];
    }
    return torrents.map(normalizeTorrent);
  } catch (err) {
    return [];
  }
});

// Renderer Starts Torrents
ipcMain.handle(EVENT_START_TORRENTS, async (_event, ids: string[]) => {
  await transmission.start(ids);
  if (ids.length === 1) {
    await Promise.race([
      transmission.waitForState(ids[0], 'DOWNLOAD'),
      transmission.waitForState(ids[0], 'SEED'),
    ]);
  }
});

ipcMain.handle(EVENT_DELETE_TORRENTS, async (_event, ids: string[]) => {
  return transmission.remove(ids, false);
});

// Renderer Stops Torrent
ipcMain.handle(EVENT_STOP_TORRENTS, async (_event, ids: string[]) => {
  await transmission.stop(ids);
  await transmission.waitForState(ids[0], 'STOPPED');
});

// Renderer Stops Torrent
ipcMain.handle(
  EVENT_ADD_TORRENT_FROM_PATH,
  async (_event, filePath: string) => {
    return addTorrentFromPath(filePath);
  }
);
