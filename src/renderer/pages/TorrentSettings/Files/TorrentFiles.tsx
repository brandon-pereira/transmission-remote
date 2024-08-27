import prettyBytes from 'pretty-bytes';
import classNames from 'classnames';
import Loader from 'renderer/components/Loader/Loader';
import useTorrent from 'renderer/hooks/useTorrent';
import SectionListItem from 'renderer/components/Section/SectionListItem';
import Section from 'renderer/components/Section/Section';
import useTorrentMutation from 'renderer/hooks/useTorrentMutation';
import {
  IconChevronUp,
  IconChevronDown,
} from 'renderer/components/Icons/Chevron';
import styles from './TorrentFiles.module.scss';

interface Props {
  torrentId: number;
}

export default function TorrentFiles({ torrentId }: Props) {
  const { torrent } = useTorrent(torrentId);
  const editTorrent = useTorrentMutation(torrentId);

  if (!torrent) {
    return <Loader />;
  }

  return (
    <Section label="Files">
      {torrent.files.map((file) => (
        <SectionListItem
          key={file.title}
          title={file.title}
          description={`${prettyBytes(file.downloaded)} / ${prettyBytes(
            file.total
          )}`}
          rightContent={
            <div className={styles.rightContent}>
              <div className={styles.priorityContainer}>
                <button
                  className={classNames(styles.priority, {
                    [styles.active]: file.priority === -1,
                  })}
                >
                  <IconChevronDown
                    onClick={() => {
                      editTorrent({
                        'priority-low': [file.id],
                      });
                    }}
                  />
                </button>
                <button
                  className={classNames(styles.priority, {
                    [styles.active]: file.priority === 0,
                  })}
                  onClick={() => {
                    editTorrent({
                      'priority-normal': [file.id],
                    });
                  }}
                >
                  -
                </button>
                <button
                  className={classNames(styles.priority, {
                    [styles.active]: file.priority === 1,
                  })}
                >
                  <IconChevronUp
                    onClick={() => {
                      editTorrent({
                        'priority-high': [file.id],
                      });
                    }}
                  />
                </button>
              </div>
              <input
                type="checkbox"
                checked={file.wanted}
                onChange={(e) => {
                  let key = 'files-unwanted';
                  if (e.currentTarget.checked) {
                    key = 'files-wanted';
                  }
                  editTorrent({
                    [key]: [file.id],
                  });
                }}
              />
            </div>
          }
        />
      ))}
    </Section>
  );
}
