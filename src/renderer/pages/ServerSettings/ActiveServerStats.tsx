import Section from 'renderer/components/Section/Section';
import useServers from 'renderer/hooks/useServers';
import styles from './ServerSettings.module.scss';

function ActiveServerStats() {
  const { activeServer } = useServers();

  if (!activeServer) {
    <Section label="Active Server">
      <strong>Inactive</strong>
    </Section>;
  }
  return (
    <Section label="Active Server">
      <strong>
        {activeServer?.host}:{activeServer?.port}
      </strong>
      <div>
        <span className={styles.statusDot} />
        Connected
        {activeServer?.username ? ` as ${activeServer?.username}` : ''}
      </div>
    </Section>
  );
}

export default ActiveServerStats;
