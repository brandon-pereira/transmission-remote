import useTorrents from 'renderer/hooks/useTorrents';
import styles from './TorrentList.module.scss';
import Torrent from '../Torrent/Torrent';

function TorrentsList() {
  const { torrents, loading } = useTorrents();

  return (
    <div className={styles.container}>
      {loading && <>Loading</>}
      {torrents.map((t) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Torrent torrent={t} key={t.id} {...t} />
      ))}
    </div>
  );
}

export default TorrentsList;
