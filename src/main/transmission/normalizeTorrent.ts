import { ITorrent, TorrentStatus } from '../../types/ITorrent';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function normalizeTorrent(torrent: any): ITorrent {
  const status =
    (TorrentStatus[torrent.status] as unknown as TorrentStatus) ||
    TorrentStatus.STOPPED;
  return {
    id: torrent.id,
    title: torrent.name,
    status,
    priority: torrent.priority,
  };
}
