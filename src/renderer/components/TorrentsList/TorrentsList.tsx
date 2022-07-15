import { useState, useEffect } from 'react';
import { ITorrent } from 'types/ITorrent';
import styles from './TorrentList.module.scss';
import Torrent from '../Torrent/Torrent';

function TorrentsList() {
  const [torrents, setTorrents] = useState<ITorrent[]>([]);
  useEffect(() => {
    const cleanup = window.electron.transmission.onTorrents(setTorrents);
    return () => cleanup();
  }, []);

  return (
    <div className={styles.container}>
      {torrents.map((t) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Torrent torrent={t} key={t.id} {...t} />
      ))}
    </div>
  );
}

export default TorrentsList;
