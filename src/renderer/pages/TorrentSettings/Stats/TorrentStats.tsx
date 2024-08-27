import Loader from 'renderer/components/Loader/Loader';
import Section from 'renderer/components/Section/Section';
import useTorrent from 'renderer/hooks/useTorrent';
import styles from './TransferStats.module.scss';
import SectionListItem from 'renderer/components/Section/SectionListItem';
import { getTorrentTertiaryTitle } from 'renderer/utils/torrents';

export default function TorrentStats({ torrentId }: { torrentId: number }) {
  const { torrent } = useTorrent(torrentId);

  if (!torrent) {
    return (
      <Section label="Stats">
        <Loader />
      </Section>
    );
  }
  return (
    <Section label="Stats">
      <SectionListItem
        title="State"
        description={getTorrentTertiaryTitle(torrent)}
      />
      <SectionListItem title="Progress" description={torrent.percentDone} />

      <SectionListItem
        title="Have"
        description={torrent.sizeStats.downloaded}
      />
      <SectionListItem
        title="Downloaded"
        description={torrent.sizeStats.downloaded}
      />
      <SectionListItem
        title="Uploaded"
        description={torrent.sizeStats.uploaded}
      />
      <SectionListItem title="Ratio" description={torrent.ratio} />
      <div className={styles.TransferStatsGrid}></div>
    </Section>
  );
}
