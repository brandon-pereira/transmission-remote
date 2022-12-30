import classnames from 'classnames';
import { useCallback, useState } from 'react';
import useTorrents from 'renderer/hooks/useTorrents';
import useSelectedTorrents from 'renderer/hooks/useSelectedTorrents';
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
  const [selectedItems, onSelectItem] = useSelectedTorrents();
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
  }, [torrent.id, refetch, isStopped]);

  // @ts-expect-error coming soon
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onDeleteTorrent = useCallback(async () => {
    await window.electron.transmission.deleteTorrents([torrent.id]);
  }, [torrent.id]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onDoubleClick={() => {
        window.electron.transmission.openTorrentSettings(torrent.id);
      }}
      onClick={(e) => {
        onSelectItem(e, torrent.id);
      }}
      className={classnames(
        styles.container,
        loading && styles.loading,
        selectedItems.includes(torrent.id) && styles.selected
      )}
    >
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
          {isStopped ? <PlayIcon className={styles.playIcon} /> : <PauseIcon />}
        </button>
      </div>
      <h2 className={classnames(styles.subtitle, styles.tertiaryTitle)}>
        {getTorrentTertiaryTitle(torrent)}
      </h2>
    </div>
  );
}

export default Torrent;
