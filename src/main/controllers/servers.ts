import { ipcMain } from 'electron';
import { IServer, IServerHealth } from 'types/IServer';
import {
  EVENT_ADD_SERVER,
  EVENT_LIST_SERVERS,
  EVENT_OPEN_SERVER_SETTINGS,
  EVENT_SET_SERVER,
} from '../events';
import getSettingsWindow, {
  createSettingsWindow,
} from '../windows/settingsWindow';
import getMainWindow from '../windows/mainWindow';
import servers from '../services/servers';

ipcMain.on(EVENT_OPEN_SERVER_SETTINGS, async () => {
  return createSettingsWindow();
});

ipcMain.handle(EVENT_ADD_SERVER, async (_event, server: IServer) => {
  await servers.addServer(server);
  const settingsWindow = getSettingsWindow();
  settingsWindow?.close();
  const mainWindow = getMainWindow();
  mainWindow?.focus();
});

ipcMain.handle(EVENT_SET_SERVER, async (_event, serverId: string) => {
  await servers.setActiveServer(serverId);
  const settingsWindow = getSettingsWindow();
  settingsWindow?.close();
  const mainWindow = getMainWindow();
  mainWindow?.focus();
  mainWindow?.reload();
});

ipcMain.handle(EVENT_LIST_SERVERS, async () => {
  const raw = servers.getServers();
  const formatted: IServer[] = raw.map((server, i) => ({
    ...server,
    isDefault: i === 0,
    isActive: i === 0,
    health: IServerHealth.UNHEALTHY,
  }));
  return formatted;
});
