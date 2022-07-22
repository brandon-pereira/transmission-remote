import { IServerHealth } from 'types/IRemote';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { ITorrent } from 'types/ITorrent';

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
      return ipcRenderer.invoke('transmission-get-torrents');
    },
    async startTorrents(torrents: string | string[]): Promise<void> {
      return ipcRenderer.invoke('transmission-start-torrents', torrents);
    },
    async stopTorrents(torrents: string | string[]): Promise<void> {
      return ipcRenderer.invoke('transmission-stop-torrents', torrents);
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
