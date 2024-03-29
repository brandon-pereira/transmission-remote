import { ipcRenderer } from 'electron';
import { ITorrent } from 'types/ITorrent';
import { Session } from 'types/ISession';
import {
  EVENT_ADD_TORRENT_FROM_PATH,
  EVENT_LIST_TORRENTS,
  EVENT_OPEN_TORRENT_FILE_PICKER,
  EVENT_START_TORRENTS,
  EVENT_STOP_TORRENTS,
  EVENT_DELETE_TORRENTS,
  EVENT_GET_SESSION,
  EVENT_SET_SESSION,
  EVENT_GET_TORRENT,
  EVENT_OPEN_TORRENT_SETTINGS,
  EVENT_SET_TORRENT_SETTINGS,
} from '../events';

export default {
  async getSession(): Promise<Partial<Session>> {
    return ipcRenderer.invoke(EVENT_GET_SESSION);
  },
  async setSession(session: Partial<Session>): Promise<Session> {
    return ipcRenderer.invoke(EVENT_SET_SESSION, session);
  },
  async getTorrents(): Promise<ITorrent[]> {
    return ipcRenderer.invoke(EVENT_LIST_TORRENTS);
  },
  async getTorrent(id: number): Promise<ITorrent> {
    return ipcRenderer.invoke(EVENT_GET_TORRENT, id);
  },
  async startTorrents(torrents: number[]): Promise<void> {
    return ipcRenderer.invoke(EVENT_START_TORRENTS, torrents);
  },
  async stopTorrents(torrents: number[]): Promise<void> {
    return ipcRenderer.invoke(EVENT_STOP_TORRENTS, torrents);
  },
  async addTorrentFromPath(filePath: string): Promise<void> {
    return ipcRenderer.invoke(EVENT_ADD_TORRENT_FROM_PATH, filePath);
  },
  async editTorrent(id: number, options: unknown) {
    return ipcRenderer.invoke(EVENT_SET_TORRENT_SETTINGS, id, options);
  },
  async deleteTorrents(torrents: number[]): Promise<void | null> {
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
  openTorrentSettings(id: number) {
    ipcRenderer.send(EVENT_OPEN_TORRENT_SETTINGS, id);
  },
};
