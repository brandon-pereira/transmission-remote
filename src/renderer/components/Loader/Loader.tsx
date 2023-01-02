import classNames from 'classnames';
import styles from './Loader.module.scss';

const Loader = ({ className }: { className?: string }) => (
  <div className={styles.container}>
    <div className={classNames(styles.spinner, className)}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
