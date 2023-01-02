import { app, dialog, ipcMain } from 'electron';
import { readFile } from 'fs/promises';
import { ITorrent } from 'types/ITorrent';
import { Session } from 'types/ISession';
import normalizeTorrent from './normalizeTorrent';
import {
  EVENT_ADD_TORRENT_FROM_PATH,
  EVENT_DELETE_TORRENTS,
  EVENT_GET_SESSION,
  EVENT_GET_TORRENT,
  EVENT_LIST_TORRENTS,
  EVENT_OPEN_TORRENT_FILE_PICKER,
  EVENT_OPEN_TORRENT_SETTINGS,
  EVENT_SET_SESSION,
  EVENT_START_TORRENTS,
  EVENT_STOP_TORRENTS,
} from '../events';
import { createTorrentSettingsWindow } from '../windows/torrentSettingsWindow';
import servers from '../services/servers';

const transmission = () => servers.transmissionInstance;

async function addTorrentFromPath(filePath: string) {
  const fileData = await readFile(filePath, { encoding: 'base64' });
  transmission().addBase64(fileData);
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
  transmission().addUrl(url);
});

// File Double Click Handler
app.on('open-file', async (_event, filePath) => {
  await addTorrentFromPath(filePath);
});

// Renderer Requests Torrents List
ipcMain.handle(EVENT_LIST_TORRENTS, async () => {
  const response = await transmission().all();
  const torrents = response.torrents as ITorrent[];
  if (!torrents || !Array.isArray(torrents)) {
    return [];
  }
  return torrents.map(normalizeTorrent);
});

// Torrent Details
ipcMain.handle(EVENT_GET_TORRENT, async (_event, id: string) => {
  const response = await transmission().get([Number(id)]);
  const torrents = response.torrents as ITorrent[];
  if (!torrents || !Array.isArray(torrents) || !torrents.length) {
    throw new Error('Invalid Torrent Provided or Server Offline');
  }
  return normalizeTorrent(torrents[0]);
});

// Renderer Starts Torrents
ipcMain.handle(EVENT_START_TORRENTS, async (_event, ids: string[]) => {
  await transmission().start(ids);
  if (ids.length === 1) {
    await Promise.race([
      transmission().waitForState(ids[0], 'DOWNLOAD'),
      transmission().waitForState(ids[0], 'SEED'),
    ]);
  }
});

ipcMain.handle(EVENT_DELETE_TORRENTS, async (_event, ids: string[]) => {
  return transmission().remove(ids, false);
});

// Renderer Stops Torrent
ipcMain.handle(EVENT_STOP_TORRENTS, async (_event, ids: string[]) => {
  await transmission().stop(ids);
  await transmission().waitForState(ids[0], 'STOPPED');
});

// Renderer Stops Torrent
ipcMain.handle(
  EVENT_ADD_TORRENT_FROM_PATH,
  async (_event, filePath: string) => {
    return addTorrentFromPath(filePath);
  }
);

// Renderer Toggles Speed Limit
ipcMain.handle(EVENT_SET_SESSION, async (_event, session: Session) => {
  transmission().session({
    ...session,
  });
});

ipcMain.handle(EVENT_GET_SESSION, async () => {
  // @ts-expect-error this library has bad typings.. this is the getter
  return transmission().session();
});

ipcMain.on(EVENT_OPEN_TORRENT_SETTINGS, async (_event, id: string) => {
  return createTorrentSettingsWindow(id);
});
