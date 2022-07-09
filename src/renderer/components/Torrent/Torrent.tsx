import styles from './Torrent.module.scss';

interface Props {
  title: string;
  percentDone: string;
}

function Torrent({ title, percentDone, rateDownload }: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div>Percent Done: {percentDone}</div>
      <div>Download Speed: {rateDownload}</div>
    </div>
  );
}

export default Torrent;
