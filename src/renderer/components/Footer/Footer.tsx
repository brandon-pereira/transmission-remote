import classNames from 'classnames';
import useSession from 'renderer/hooks/useSession';
import useSpeedLimit from 'renderer/hooks/useSpeedLimit';
import useTorrents from 'renderer/hooks/useTorrents';
import TurtleIcon from '../Icons/TurtleIcon';
import styles from './Footer.module.scss';

function Footer() {
  const { torrents } = useTorrents();
  const { loading, error } = useSession();
  const [isActive, onToggleSpeedLimit] = useSpeedLimit();

  if (loading) {
    return <div className={styles.container}>Connecting...</div>;
  }
  if (error) {
    return <div className={styles.container}>Error Connecting</div>;
  }
  return (
    <div className={styles.container}>
      <TurtleIcon
        onClick={onToggleSpeedLimit}
        className={classNames(styles.speedLimitIcon, isActive && styles.active)}
      />
      <div className={styles.text}>{torrents?.length ?? 0} active torrents</div>
    </div>
  );
}

export default Footer;
