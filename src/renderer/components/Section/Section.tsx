import classNames from 'classnames';

import styles from './Section.module.scss';

interface Props {
  label?: string;
  noPadding?: boolean;
  children: React.ReactNode;
}

function Section({ label, noPadding, children }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div
        className={classNames(styles.content, noPadding && styles.noPadding)}
      >
        {children}
      </div>
    </div>
  );
}

export default Section;
