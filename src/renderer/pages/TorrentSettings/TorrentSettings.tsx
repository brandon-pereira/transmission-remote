import { useParams } from 'react-router-dom';
import TitleBar from 'renderer/components/TitleBar/TitleBar';
import Loader from 'renderer/components/Loader/Loader';
import useTorrent from 'renderer/hooks/useTorrent';
import Section from 'renderer/components/Section/Section';
import SectionListItem from 'renderer/components/Section/SectionListItem';
import styles from './TorrentSettings.module.scss';

function TorrentSettings() {
  const { torrentId } = useParams();

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
      <h2>Coming Soon 🚀</h2>
      <div className={styles.container}>
        <Section>
          {torrent.files.map((file) => (
            <SectionListItem
              key={file.title}
              title={file.title}
              rightContent={
                <>
                  {'[<][.][>]'}
                  <input type="checkbox" checked={file.wanted} readOnly />
                </>
              }
            />
            // <div key={file.title}>{file.title}</div>
          ))}
        </Section>
      </div>
    </>
  );
}

export default TorrentSettings;
