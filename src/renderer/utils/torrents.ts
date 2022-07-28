import formatDistance from 'date-fns/formatDistance';
import prettyBytes from 'pretty-bytes';
import { ITorrent, TorrentStatus } from 'types/ITorrent';

export function getProgressBarColorFromStatus(status: TorrentStatus) {
  if (status === TorrentStatus.SEED) {
    return 'green';
  }
  if (status === TorrentStatus.DOWNLOAD) {
    return 'blue';
  }
  return 'default';
}

export function getIsStoppedStateFromStatus(status: TorrentStatus) {
  return ![TorrentStatus.SEED, TorrentStatus.DOWNLOAD].includes(status);
}

export function getTorrentSubtitle(torrent: ITorrent) {
  let eta = 'unknown';
  if (torrent.eta) {
    eta = formatDistance(new Date(torrent.eta), new Date(), {
      includeSeconds: true,
    });
  }
  return `${prettyBytes(torrent.downloadSize)} of ${prettyBytes(
    torrent.totalSize
  )} (${torrent.percentDone.toFixed(2)}%) - Remaining time ${eta}`;
}

export function getTorrentTertiaryTitle(torrent: ITorrent) {
  if (TorrentStatus.STOPPED === torrent.status) {
    return 'Paused';
  }
  if (TorrentStatus.SEED === torrent.status) {
    return `Seeding to ${torrent.peerStats.getters} of ${
      torrent.peerStats.connected
    } peers - UL: ${prettyBytes(torrent.speeds.upload)}/s`;
  }
  return `Downloading from ${torrent.peerStats.givers} of ${
    torrent.peerStats.connected
  } peers - DL: ${prettyBytes(torrent.speeds.download)}/s, UL: ${
    torrent.speeds.upload || '-- kB'
  }/s`;
}
