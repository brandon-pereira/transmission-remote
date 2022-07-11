import { useState, useEffect } from 'react';
import styles from './TorrentList.module.scss';
import Torrent from '../Torrent/Torrent';

function TorrentsList() {
  const [torrents, setTorrents] = useState<any[]>([]);
  useEffect(() => {
    window.electron.ipcRenderer.on('files', (files) => {
      console.log(files);
      setTorrents(files.torrents);
    });
  });

  return (
    <div className={styles.container}>
      {torrents.map((t) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Torrent title={t.name} key={t.id} {...t} />
      ))}
    </div>
  );
}

export default TorrentsList;
