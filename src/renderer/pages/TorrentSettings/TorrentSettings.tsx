import { useParams } from 'react-router-dom';
import TitleBar from 'renderer/components/TitleBar/TitleBar';
import Loader from 'renderer/components/Loader/Loader';
import useTorrent from 'renderer/hooks/useTorrent';
import Section from 'renderer/components/Section/Section';
import styles from './TorrentSettings.module.scss';

function TorrentSettings() {
  const { fileId } = useParams();

  const { torrent, error, loading } = useTorrent(fileId);

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
      <h2>Coming Soon 🚀</h2>
      <div className={styles.container}>
        <Section>
          {torrent.files.map((file) => (
            <div key={file.title}>{file.title}</div>
          ))}
        </Section>
      </div>
    </>
  );
}

export default TorrentSettings;
