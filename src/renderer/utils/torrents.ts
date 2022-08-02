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

function roundNumber(number: number) {
  return number?.toFixed(2) || 0;
}

export function getTorrentSubtitle(torrent: ITorrent) {
  let eta = 'unknown';
  if (torrent.eta) {
    eta = formatDistance(new Date(torrent.eta), new Date(), {
      includeSeconds: true,
    });
  }
  if (torrent.status === TorrentStatus.SEED || torrent.isFinished) {
    let msg = `${prettyBytes(
      torrent.sizeStats.downloaded
    )}, uploaded ${prettyBytes(
      torrent.sizeStats.uploaded
    )} (Ratio: ${roundNumber(torrent.ratio)})`;
    if (!torrent.isFinished) {
      msg += `- remaining time ${eta}`;
    }
    return msg;
  }

  return `${prettyBytes(torrent.sizeStats.downloaded)} of ${prettyBytes(
    torrent.sizeStats.total
  )} (${roundNumber(torrent.percentDone)}%) - Remaining time ${eta}`;
}

export function getTorrentTertiaryTitle(torrent: ITorrent) {
  if (torrent.isFinished && TorrentStatus.STOPPED === torrent.status) {
    return `Seeding complete`;
  }
  if (TorrentStatus.STOPPED === torrent.status) {
    return 'Paused';
  }
  if (TorrentStatus.CHECK_WAIT === torrent.status) {
    return 'Queued to check files';
  }
  if (TorrentStatus.CHECK === torrent.status) {
    return 'Verifying local data';
  }
  if (TorrentStatus.SEED === torrent.status) {
    return `Seeding to ${torrent.peerStats.getters} of ${
      torrent.peerStats.connected
    } peers - UL: ${prettyBytes(torrent.speeds.upload)}/s`;
  }
  return `Downloading from ${torrent.peerStats.givers} of ${
    torrent.peerStats.connected
  } peers - DL: ${prettyBytes(torrent.speeds.download)}/s, UL: ${
    torrent.speeds.upload ? prettyBytes(torrent.speeds.upload) : '0 kB'
  }/s`;
}
