import classNames from 'classnames';
import useServers from 'renderer/hooks/useServers';
import AddFilesIcon from '../Icons/AddFilesIcon';
import ServerIcon from '../Icons/ServerIcon';
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
          className={classNames(styles.button, styles.iconButton)}
          onClick={() => {
            window.electron.transmission.openFilePicker();
          }}
        >
          <AddFilesIcon />
        </button>
        <button
          onClick={() => {
            window.electron.transmission.openServerSettings();
          }}
          type="button"
          className={styles.button}
        >
          <ServerIcon />
          {activeServer?.host}:{activeServer?.port}
        </button>
      </div>
    </div>
  );
}

export default Header;
