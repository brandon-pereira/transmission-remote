import Button from 'renderer/components/Button/Button';
import Section from 'renderer/components/Section/Section';
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
    <Section label="Known Servers" noPadding>
      {servers?.map((s) => (
        <div className={styles.serverListOption} key={s.id}>
          <div>
            {s.host}:{s.port}
          </div>
          <Button
            className={styles.serverListOptionButton}
            onClick={() => {
              window.electron.servers.setServer(s.id);
            }}
          >
            Connect
          </Button>
        </div>
      ))}
    </Section>
  );
}

export default KnownServerList;
