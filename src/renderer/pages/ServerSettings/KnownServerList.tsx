import Button from 'renderer/components/Button/Button';
import Section from 'renderer/components/Section/Section';
import SectionListItem from 'renderer/components/Section/SectionListItem';
import useServers from 'renderer/hooks/useServers';
import styles from './ServerSettings.module.scss';

function KnownServerList() {
  const { servers } = useServers();

  if (!servers) {
    <Section label="Known Servers">
      <strong>Loading</strong>
    </Section>;
  }
  return (
    <Section label="Known Servers">
      {servers?.map((s) => (
        <SectionListItem
          title={`${s.host}:${s.port}`}
          key={s.id}
          rightContent={
            <Button
              className={styles.serverListOptionButton}
              onClick={() => {
                window.electron.servers.setServer(s.id);
              }}
            >
              Connect
            </Button>
          }
        />
      ))}
    </Section>
  );
}

export default KnownServerList;
