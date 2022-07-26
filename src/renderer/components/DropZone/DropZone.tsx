import classNames from 'classnames';
import { useEffect, useState, useRef } from 'react';
import styles from './DropZone.module.scss';
interface Props {
  children: React.ReactNode;
}

function DropZone({ children }: Props) {
  const [isDropping, setDropping] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    container.current.addEventListener('drop', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDropping(false);
      const uploads = Array.from(e.dataTransfer?.files || []).map(
        async (file) => {
          try {
            // eslint-disable-next-line no-console
            console.log(file);
            window.electron.transmission.addTorrentFromPath(file.path);
          } catch (err) {
            alert(err);
          }
        }
      );
      await Promise.all([uploads]);
    });
    container.current.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    container.current?.addEventListener('dragenter', (e) => {
      setDropping(true);
    });
    container.current?.addEventListener('dragleave', (e) => {
      // https://stackoverflow.com/a/54271161
      // @ts-expect-error this works properly lol
      if (e.currentTarget.contains(e.relatedTarget)) {
        return;
      }
      setDropping(false);
    });
  }, []);

  return (
    <div
      ref={container}
      className={classNames(styles.container, isDropping && styles.active)}
    >
      {children}
    </div>
  );
}

export default DropZone;
