import classnames from 'classnames';
import {
  getProgressBarColorFromStatus,
  getTorrentSubtitle,
} from 'renderer/utils/torrents';
import { ITorrent } from 'types/ITorrent';
import styles from './Torrent.module.scss';

interface Props {
  torrent: ITorrent;
}

function Torrent({ torrent }: Props) {
  return (
    <div className={styles.container}>
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
