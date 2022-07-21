import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IServerHealth } from 'types/IRemote';
import { ITorrent } from 'types/ITorrent';

export type Channels = 'transmission-get-files' | 'open-file-picker';

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
    async getTorrents() {
      return ipcRenderer.send('transmission-get-files');
    },
    onTorrents(cb: (torrents: ITorrent[]) => void) {
      const subscription = (_event: IpcRendererEvent, torrents: ITorrent[]) =>
        cb(torrents);
      ipcRenderer.on('transmission-send-files', subscription);
      return () => {
        ipcRenderer.removeListener('transmission-send-files', subscription);
      };
    },
    onServerHealthChange(cb: (health: IServerHealth) => void) {
      const subscription = (_event: IpcRendererEvent, health: IServerHealth) =>
        cb(health);
      ipcRenderer.on('transmission-remote-health', subscription);
      return () => {
        ipcRenderer.removeListener('transmission-remote-health', subscription);
      };
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
