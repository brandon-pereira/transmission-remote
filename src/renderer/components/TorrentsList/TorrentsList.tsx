import useTorrents from 'renderer/hooks/useTorrents';
import Loader from '../Loader/Loader';
import Torrent from '../Torrent/Torrent';
import styles from './TorrentList.module.scss';

function TorrentsList() {
  const { torrents, error, loading } = useTorrents();

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      {error && (
        <div className={styles.error}>
          <span>🔌 ❌</span>
          <h3>Unable to connect to server</h3>
          <p>Please verify your server is running and try again.</p>
        </div>
      )}
      {torrents?.map((t) => (
        <Torrent torrent={t} key={t.id} {...t} />
      ))}
    </div>
  );
}

export default TorrentsList;
