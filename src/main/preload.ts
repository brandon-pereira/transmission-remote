import { IServerHealth } from 'types/IServer';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { ITorrent } from 'types/ITorrent';
import {
  EVENT_LIST_TORRENTS,
  EVENT_START_TORRENTS,
  EVENT_STOP_TORRENTS,
} from './transmission/events';

export type Channels = 'open-file-picker';

export const api = {
  ipcRenderer: {
    sendMessage(channel: Channels, args?: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  transmission: {
    onServerHealthChange(cb: (health: IServerHealth) => void) {
      const subscription = (_event: IpcRendererEvent, health: IServerHealth) =>
        cb(health);
      ipcRenderer.on('transmission-remote-health', subscription);
      return () => {
        ipcRenderer.removeListener('transmission-remote-health', subscription);
      };
    },
    async getTorrents(): Promise<ITorrent[]> {
      return ipcRenderer.invoke(EVENT_LIST_TORRENTS);
    },
    async startTorrents(torrents: string | string[]): Promise<void> {
      return ipcRenderer.invoke(EVENT_START_TORRENTS, torrents);
    },
    async stopTorrents(torrents: string | string[]): Promise<void> {
      return ipcRenderer.invoke(EVENT_STOP_TORRENTS, torrents);
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
