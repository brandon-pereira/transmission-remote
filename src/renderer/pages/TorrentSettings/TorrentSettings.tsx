import { useParams } from 'react-router-dom';
import TitleBar from 'renderer/components/TitleBar/TitleBar';
import Loader from 'renderer/components/Loader/Loader';
import useTorrent from 'renderer/hooks/useTorrent';
import Section from 'renderer/components/Section/Section';
import SectionListItem from 'renderer/components/Section/SectionListItem';
import useTorrentMutation from 'renderer/hooks/useTorrentMutation';
import styles from './TorrentSettings.module.scss';

function TorrentSettings() {
  const { torrentId: rawTorrentId } = useParams();
  const torrentId = Number(rawTorrentId);
  const { torrent, error, loading } = useTorrent(torrentId);
  const editTorrent = useTorrentMutation(torrentId);

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
                  <input
                    type="checkbox"
                    checked={file.wanted}
                    onChange={(e) => {
                      let key = 'files-unwanted';
                      if (e.currentTarget.checked) {
                        key = 'files-wanted';
                      }
                      editTorrent({
                        [key]: [file.id],
                      });
                    }}
                  />
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
