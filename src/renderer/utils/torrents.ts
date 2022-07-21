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
