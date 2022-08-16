import useTorrents from 'renderer/hooks/useTorrents';
import styles from './Footer.module.scss';

function Footer() {
  const { loading, error, torrents } = useTorrents();
  if (loading) {
    return <div className={styles.container}>Connecting...</div>;
  }
  if (error) {
    return <div className={styles.container}>Error Fetching Torrents</div>;
  }
  return (
    <div className={styles.container}>
      {torrents?.length ?? 0} active torrents
    </div>
  );
}

export default Footer;
