import { ITorrent } from 'types/ITorrent';
import styles from './Torrent.module.scss';

interface Props {
  torrent: ITorrent;
}

function Torrent({ torrent }: Props) {
  console.log(torrent);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{torrent.title}</h2>
      <div>Percent Done: {torrent.percentDone}</div>
      <div>Download Speed: {torrent.rateDownload}</div>
    </div>
  );
}

export default Torrent;
