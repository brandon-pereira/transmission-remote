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
        <Torrent title={t.name} {...t} />
      ))}
    </div>
  );
}

export default TorrentsList;
