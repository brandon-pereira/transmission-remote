import classnames from 'classnames';
import { useCallback } from 'react';
import {
  getProgressBarColorFromStatus,
  getTorrentSubtitle,
  getIsStoppedStateFromStatus,
  getTorrentTertiaryTitle,
} from 'renderer/utils/torrents';
import type { ITorrent } from 'types/ITorrent';
import styles from './Torrent.module.scss';

interface Props {
  torrent: ITorrent;
}

function Torrent({ torrent }: Props) {
  const isStopped = getIsStoppedStateFromStatus(torrent.status);
  const toggleTorrentState = useCallback(async () => {
    if (isStopped) {
      await window.electron.transmission.startTorrents(torrent.id);
    } else {
      await window.electron.transmission.stopTorrents(torrent.id);
    }
  }, [torrent.id, isStopped]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{torrent.title}</h2>
      <h2 className={styles.subtitle}>{getTorrentSubtitle(torrent)}</h2>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}>
          <div
            style={{ width: `${torrent.percentDone}%` }}
            className={classnames(
              styles.bar,
              styles[getProgressBarColorFromStatus(torrent.status)]
            )}
          />
        </div>
        <button
          className={classnames(styles.button, styles.playPause)}
          type="button"
          onClick={toggleTorrentState}
        >
          {isStopped ? '▶️' : '⏸'}
        </button>
      </div>
      <h2 className={classnames(styles.subtitle, styles.tertiaryTitle)}>
        {getTorrentTertiaryTitle(torrent)}
      </h2>
    </div>
  );
}

export default Torrent;
