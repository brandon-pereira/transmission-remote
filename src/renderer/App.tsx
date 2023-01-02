import './global.css';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import ServerSettings from './pages/ServerSettings/ServerSettings';
import MainWindow from './pages/MainWindow/MainWindow';
import Files from './pages/Files/Files';

let startPath = '/home';
const deeplink = window.location.hash;
if (deeplink) {
  startPath = deeplink.replace('#', '/');
}

export default function App() {
  return (
    <Router initialEntries={[startPath]}>
      <Routes>
        <Route path="/home" element={<MainWindow />} />
        <Route path="/server-settings" element={<ServerSettings />} />
        <Route path="/files/:fileId" element={<Files />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}
