/* eslint-disable class-methods-use-this */
import store from 'main/utils/store';
import Transmission from 'transmission-promise';
import { IServerConfiguration } from 'types/IServer';
import { STORE_REMOTES_SETTINGS } from './events';

class ServerManager {
  activeServer: IServerConfiguration;

  transmissionInstance: Transmission;

  constructor() {
    let servers = this.getServers();
    if (!servers || !servers.length) {
      servers = [this.createServerEntry({ host: 'localhost', port: 9091 })];
      store.set(STORE_REMOTES_SETTINGS, servers);
    }
    const [activeServer] = servers;
    this.activeServer = activeServer;
    this.transmissionInstance = new Transmission(activeServer);
    // eslint-disable-next-line no-console
    console.log('Connecting to Transmission with Settings:', activeServer);
  }

  setActiveServer(serverId: string) {
    const currentServers = this.getServers();
    const idx = currentServers.findIndex((server) => server.id === serverId);
    if (idx < 0) {
      throw new Error('Invalid Server ID Provided');
    }
    const server = currentServers[idx];
    // move server to front of array
    currentServers.splice(idx, 1);
    const next = [server, ...currentServers];
    this.setServers(next);
  }

  private setServers(servers: IServerConfiguration[]) {
    store.set(STORE_REMOTES_SETTINGS, servers);
    const activeServer = servers[0];
    const tempInstance = new Transmission(activeServer);
    this.transmissionInstance = tempInstance;
    this.activeServer = activeServer;
  }

  async addServer(server: Omit<IServerConfiguration, 'id'>) {
    const resolved = this.createServerEntry(server);
    const prev = store.get(STORE_REMOTES_SETTINGS);
    const next = [resolved, ...prev];
    const tempServer = new Transmission(server);
    await tempServer.sessionStats();
    this.setServers(next);
    return tempServer;
  }

  private createServerEntry(
    entry: Omit<IServerConfiguration, 'id'>
  ): IServerConfiguration {
    const id = `${entry.host}:${entry.port}@${entry.username}`;
    return { id, ...entry };
  }

  getServers() {
    return store.get(STORE_REMOTES_SETTINGS);
  }
}

export default new ServerManager();
