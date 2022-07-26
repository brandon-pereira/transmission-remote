import './global.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import styles from './App.module.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DropZone from './components/DropZone/DropZone';
import Torrents from './components/TorrentsList/TorrentsList';
import './utils/storage';
import ServerSettings from './components/ServerSettings';

function MainWindow() {
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

let startPath = '/';
const deeplink = window.location.hash;
if (deeplink === '#server-settings') {
  startPath = '/server-settings';
}

export default function App() {
  return (
    <Router initialEntries={[startPath]}>
      <Routes>
        <Route path="/" element={<MainWindow />} />
        <Route path="/server-settings" element={<ServerSettings />} />
      </Routes>
    </Router>
  );
}
