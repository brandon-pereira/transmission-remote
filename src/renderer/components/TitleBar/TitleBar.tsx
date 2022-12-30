import classNames from 'classnames';
import styles from './TitleBar.module.scss';

interface Props {
  title?: string;
  leftButtons?: React.ReactNode;
  rightButtons?: React.ReactNode;
}

function TitleBar({ title, leftButtons, rightButtons }: Props) {
  const showButtons = Boolean(leftButtons || rightButtons);

  return (
    <div
      className={classNames(
        styles.container,
        showButtons && styles.showButtons
      )}
    >
      <h1 className={styles.title}>{title || 'Transmission Remote'}</h1>
      {showButtons && (
        <div className={styles.buttons}>
          <div className={styles.leftButtons}>{leftButtons}</div>
          {rightButtons}
        </div>
      )}
    </div>
  );
}

export default TitleBar;
