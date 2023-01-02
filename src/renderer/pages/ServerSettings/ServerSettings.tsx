import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IServer } from 'types/IServer';

import styles from './ServerSettings.module.scss';
import FormInput from '../../components/Forms/Input/Input';
import FormError from '../../components/Forms/Error/Error';
import Button from '../../components/Forms/Button/Button';
import TitleBar from '../../components/TitleBar/TitleBar';
import Section from '../../components/Section/Section';
import ActiveServerStats from './ActiveServerStats';
import KnownServerList from './KnownServerList';

function ServerSettings() {
  const [connecting, setConnecting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<IServer>({
    defaultValues: {
      host: 'localhost',
      port: 9091,
    },
  });

  const onSubmit = async (data: IServer) => {
    // eslint-disable-next-line no-console
    console.log('final data', data);
    try {
      setConnecting(true);
      await window.electron.servers.addServer(data);
      setConnecting(false);
      // eslint-disable-next-line no-console
      console.log('ADDED');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('ERROR', err);
      setConnecting(false);
      setServerError((err as Error).toString());
    }
  };

  return (
    <>
      <TitleBar />
      <div className={styles.container}>
        <ActiveServerStats />
        <KnownServerList />
        <Section label="Add New">
          {serverError && <FormError errorMessage={serverError} />}
          <p>
            Please specify the remote Transmission servers details so we can
            connect to this server.
          </p>
          <p>
            If you&apos;re unable to establish a connect, try connecting from
            the browser to verify it works there.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Remote Host"
              placeholder="localhost"
              {...register('host', {
                required: true,
              })}
            />
            <FormInput
              type="number"
              label="Port"
              placeholder="9091"
              {...register('port', {
                required: true,
                min: 1,
                max: 65535,
                valueAsNumber: true,
              })}
            />
            <FormInput label="Username" {...register('username')} />
            <FormInput
              type="password"
              label="Password"
              {...register('password')}
            />
            <Button
              disabled={connecting}
              type="submit"
              className={styles.addButton}
            >
              {connecting ? 'Connecting...' : 'Add Remote'}
            </Button>
          </form>
        </Section>
      </div>
    </>
  );
}

export default ServerSettings;
