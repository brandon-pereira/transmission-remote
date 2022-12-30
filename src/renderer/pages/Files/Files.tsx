import { useParams } from 'react-router-dom';
import TitleBar from 'renderer/components/TitleBar/TitleBar';
import useTorrent from 'renderer/hooks/useTorrent';

function Files() {
  const { fileId } = useParams();

  const { torrent, loading, error } = useTorrent(fileId);

  return (
    <div>
      <TitleBar title={torrent?.title} />
      <h2>Coming Soon 🚀</h2>
    </div>
  );
}

export default Files;
