import classnames from 'classnames';
import { useCallback } from 'react';
import {
  getProgressBarColorFromStatus,
  getTorrentSubtitle,
  getIsStoppedStateFromStatus,
} from 'renderer/utils/torrents';
import type { ITorrent } from 'types/ITorrent';
import styles from './Torrent.module.scss';

interface Props {
  torrent: ITorrent;
}

function Torrent({ torrent }: Props) {
  const isStopped = getIsStoppedStateFromStatus(torrent.status);
  console.log(torrent.title, isStopped);
  const toggleTorrentState = useCallback(async () => {
    if (isStopped) {
      await window.electron.transmission.startTorrents(torrent.id);
    } else {
      await window.electron.transmission.stopTorrents(torrent.id);
    }
  }, [torrent.id, isStopped]);

  return (
    <div className={styles.container}>
      <button type="button" onClick={toggleTorrentState}>
        {isStopped ? 'Start' : 'Stop'}
      </button>
      <h2 className={styles.title}>{torrent.title}</h2>
      <h2 className={styles.subtitle}>{getTorrentSubtitle(torrent)}</h2>
      <div className={styles.progressBar}>
        <div
          style={{ width: `${torrent.percentDone}%` }}
          className={classnames(
            styles.bar,
            styles[getProgressBarColorFromStatus(torrent.status)]
          )}
        />
      </div>
    </div>
  );
}

export default Torrent;
