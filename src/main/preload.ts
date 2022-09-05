import { IServer, IServerHealth } from 'types/IServer';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { ITorrent } from 'types/ITorrent';
import {
  EVENT_ADD_SERVER,
  EVENT_ADD_TORRENT_FROM_PATH,
  EVENT_LIST_SERVERS,
  EVENT_LIST_TORRENTS,
  EVENT_OPEN_SERVER_SETTINGS,
  EVENT_OPEN_TORRENT_FILE_PICKER,
  EVENT_START_TORRENTS,
  EVENT_STOP_TORRENTS,
  EVENT_DELETE_TORRENTS,
} from './transmission/events';

const api = {
  // ipcRenderer: {
  //   sendMessage(channel: Channels, args?: unknown[]) {
  //     ipcRenderer.send(channel, args);
  //   },
  //   on(channel: Channels, func: (...args: unknown[]) => void) {
  //     const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
  //       func(...args);
  //     ipcRenderer.on(channel, subscription);

  //     return () => ipcRenderer.removeListener(channel, subscription);
  //   },
  //   once(channel: Channels, func: (...args: unknown[]) => void) {
  //     ipcRenderer.once(channel, (_event, ...args) => func(...args));
  //   },
  // },
  transmission: {
    onServerHealthChange(cb: (health: IServerHealth) => void) {
      const subscription = (_event: IpcRendererEvent, health: IServerHealth) =>
        cb(health);
      ipcRenderer.on('transmission-remote-health', subscription);
      return () => {
        ipcRenderer.removeListener('transmission-remote-health', subscription);
      };
    },
    async getServers(): Promise<IServer[]> {
      return ipcRenderer.invoke(EVENT_LIST_SERVERS);
    },
    async addServer(server: IServer): Promise<IServer[]> {
      return ipcRenderer.invoke(EVENT_ADD_SERVER, server);
    },
    async getTorrents(): Promise<ITorrent[]> {
      return ipcRenderer.invoke(EVENT_LIST_TORRENTS);
    },
    async startTorrents(torrents: string[]): Promise<void> {
      return ipcRenderer.invoke(EVENT_START_TORRENTS, torrents);
    },
    async stopTorrents(torrents: string[]): Promise<void> {
      return ipcRenderer.invoke(EVENT_STOP_TORRENTS, torrents);
    },
    async addTorrentFromPath(filePath: string): Promise<void> {
      return ipcRenderer.invoke(EVENT_ADD_TORRENT_FROM_PATH, filePath);
    },
    async deleteTorrents(torrents: string[]): Promise<void | null> {
      // eslint-disable-next-line no-restricted-globals, no-alert
      const confirmation = confirm(
        'Are you sure you want to delete the selected torrents?'
      );
      if (confirmation) {
        return ipcRenderer.invoke(EVENT_DELETE_TORRENTS, torrents);
      }
      return null;
    },
    openFilePicker() {
      ipcRenderer.send(EVENT_OPEN_TORRENT_FILE_PICKER);
    },
    openServerSettings() {
      ipcRenderer.send(EVENT_OPEN_SERVER_SETTINGS);
    },
  },
  store: {
    get(val: string) {
      return ipcRenderer.sendSync('electron-store-get', val);
    },
    set(property: string, val: unknown) {
      ipcRenderer.send('electron-store-set', property, val);
    },
  },
};

contextBridge.exposeInMainWorld('electron', api);

export default api;
