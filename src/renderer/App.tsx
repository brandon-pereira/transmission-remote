import './global.css';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DropZone from './components/DropZone/DropZone';
import Torrents from './components/TorrentsList/TorrentsList';
import './utils/storage';

export default function App() {
  return (
    <div className={styles.container}>
      <Header />
      <DropZone>
        <Torrents />
      </DropZone>
      <Footer />
    </div>
  );
}
