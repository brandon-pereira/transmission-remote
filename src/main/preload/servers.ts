import { ipcRenderer, IpcRendererEvent } from 'electron';
import { IServer, IServerHealth } from 'types/IServer';
import {
  EVENT_ADD_SERVER,
  EVENT_LIST_SERVERS,
  EVENT_OPEN_SERVER_SETTINGS,
  EVENT_SET_SERVER,
} from '../transmission/events';

export default {
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
  setServer(serverId: string): Promise<void> {
    return ipcRenderer.invoke(EVENT_SET_SERVER, serverId);
  },
  openServerSettings() {
    ipcRenderer.send(EVENT_OPEN_SERVER_SETTINGS);
  },
};
