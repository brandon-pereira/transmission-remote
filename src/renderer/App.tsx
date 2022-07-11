import './global.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Dropzone from './Dropzone';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Torrents from './components/TorrentsList/TorrentsList';
import './utils/storage';

setInterval(() => {
  window.electron.transmission.getTorrents();
}, 1000);

const Hello = () => {
  return (
    <div className={styles.container}>
      {/* <Dropzone /> */}
      <Header />
      <Torrents />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
