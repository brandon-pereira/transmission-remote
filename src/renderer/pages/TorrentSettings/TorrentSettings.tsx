import prettyBytes from 'pretty-bytes';
import { useParams } from 'react-router-dom';
import TitleBar from 'renderer/components/TitleBar/TitleBar';
import Loader from 'renderer/components/Loader/Loader';
import useTorrent from 'renderer/hooks/useTorrent';
import styles from './TorrentSettings.module.scss';
import TorrentFiles from './Files/TorrentFiles';
import Section from 'renderer/components/Section/Section';
import TorrentStats from './Stats/TorrentStats';

function TorrentSettings() {
  const { torrentId: rawTorrentId } = useParams();
  const torrentId = Number(rawTorrentId);
  const { torrent, error, loading } = useTorrent(torrentId);

  if (loading) {
    return (
      <>
        <TitleBar />
        <Loader />
      </>
    );
  }

  if (error || !torrent) {
    // eslint-disable-next-line no-console
    console.log({ error, torrent });
    return (
      <>
        <TitleBar />
        Oops! Something went wrong.
      </>
    );
  }

  return (
    <>
      <TitleBar title={torrent?.title} />
      <div className={styles.container}>
        <h2>{torrent?.title}</h2>
        <h3>{prettyBytes(torrent.sizeStats.total)}</h3>
        <TorrentStats torrentId={torrentId} />
        <TorrentFiles torrentId={torrentId} />
      </div>
    </>
  );
}

export default TorrentSettings;
