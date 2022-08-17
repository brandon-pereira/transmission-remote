import classnames from 'classnames';
import { useCallback, useState } from 'react';
import useTorrents from 'renderer/hooks/useTorrents';
import {
  getProgressBarColorFromStatus,
  getTorrentSubtitle,
  getIsStoppedStateFromStatus,
  getTorrentTertiaryTitle,
} from 'renderer/utils/torrents';
import type { ITorrent } from 'types/ITorrent';
import styles from './Torrent.module.scss';
import PlayIcon from '../Icons/PlayIcon';
import PauseIcon from '../Icons/PauseIcon';

interface Props {
  torrent: ITorrent;
}

function Torrent({ torrent }: Props) {
  const { refetch } = useTorrents();
  const [loading, setLoading] = useState(false);
  const isStopped = getIsStoppedStateFromStatus(torrent.status);
  const toggleTorrentState = useCallback(async () => {
    setLoading(true);
    if (isStopped) {
      await window.electron.transmission.startTorrents([torrent.id]);
      await refetch();
    } else {
      await window.electron.transmission.stopTorrents([torrent.id]);
      await refetch();
    }
    setLoading(false);
    console.log('Done toggling state');
  }, [torrent.id, refetch, isStopped]);

  const onDeleteTorrent = useCallback(async () => {
    await window.electron.transmission.deleteTorrents([torrent.id]);
  }, [torrent.id]);

  return (
    <div className={classnames(styles.container, loading && styles.loading)}>
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
          {isStopped ? <PlayIcon /> : <PauseIcon />}
        </button>
      </div>
      <h2 className={classnames(styles.subtitle, styles.tertiaryTitle)}>
        {getTorrentTertiaryTitle(torrent)}
      </h2>
    </div>
  );
}

export default Torrent;
