import useTorrents from 'renderer/hooks/useTorrents';
import Torrent from '../Torrent/Torrent';

function TorrentsList() {
  const { torrents, loading } = useTorrents();

  return (
    <div>
      {loading && <>Loading</>}
      {torrents?.map((t) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Torrent torrent={t} key={t.id} {...t} />
      ))}
    </div>
  );
}

export default TorrentsList;
