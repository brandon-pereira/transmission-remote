import { ITorrent } from '../../types/ITorrent';

function getTorrentEta(eta: number) {
  // -1 means not available and -2 means unknown.
  if (eta === -1) {
    return null;
  }
  if (eta <= 0) {
    return null;
  }
  return Date.now() + eta * 1000;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function normalizeTorrent(torrent: any): ITorrent {
  return {
    id: torrent.id,
    title: torrent.name,
    eta: getTorrentEta(torrent.eta),
    percentDone: torrent.percentDone * 100,
    downloadSize: torrent.downloadedEver,
    totalSize: torrent.totalSize,
    status: torrent.status,
    priority: torrent.priority,
  };
}
