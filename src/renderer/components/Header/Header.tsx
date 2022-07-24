import useServers from 'renderer/hooks/useServers';
import styles from './Header.module.scss';

function Header() {
  const { activeServer } = useServers();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Transmission Remote</h1>
      <div className={styles.buttons}>
        <button
          type="button"
          aria-label="Add Torrent"
          className={styles.button}
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('open-file-picker');
          }}
        >
          Add Torrent
        </button>
        <button type="button" className={styles.button}>
          {activeServer?.host}:{activeServer?.port}
        </button>
      </div>
    </div>
  );
}

export default Header;
