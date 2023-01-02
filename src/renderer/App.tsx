import './global.css';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import ServerSettings from './pages/ServerSettings/ServerSettings';
import MainWindow from './pages/MainWindow/MainWindow';
import TorrentSettings from './pages/TorrentSettings/TorrentSettings';

let startPath = '/home';
const deeplink = window.location.hash;
if (deeplink) {
  startPath = deeplink.replace('#', '/');
}

startPath = '/files/1';

export default function App() {
  return (
    <Router initialEntries={[startPath]}>
      <Routes>
        <Route path="/home" element={<MainWindow />} />
        <Route path="/server-settings" element={<ServerSettings />} />
        <Route path="/files/:fileId" element={<TorrentSettings />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}
