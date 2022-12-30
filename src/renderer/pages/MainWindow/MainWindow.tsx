import Header from 'renderer/pages/MainWindow/Header';
import Footer from 'renderer/components/Footer/Footer';
import DropZone from 'renderer/components/DropZone/DropZone';
import Torrents from 'renderer/components/TorrentsList/TorrentsList';

import { Provider as SelectedTorrentProvider } from 'renderer/hooks/useSelectedTorrents';

import styles from './MainWindow.module.scss';

function MainWindow() {
  return (
    <SelectedTorrentProvider>
      <div className={styles.container}>
        <Header />
        <DropZone>
          <Torrents />
        </DropZone>
        <Footer />
      </div>
    </SelectedTorrentProvider>
  );
}

export default MainWindow;
