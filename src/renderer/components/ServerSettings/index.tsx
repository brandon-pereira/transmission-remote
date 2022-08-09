import { useForm } from 'react-hook-form';
import { IServer } from 'types/IServer';

import styles from './ServerSettings.module.scss';
import FormInput from '../Forms/Input/Input';
import { useState } from 'react';
import FormError from '../Forms/Error/Error';

function ServerSettings() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IServer>({
    defaultValues: {
      host: 'localhost',
      port: 9091,
    },
  });

  const onSubmit = async (data: IServer) => {
    console.log('final data', data);
    try {
      await window.electron.transmission.addServer(data);
      console.log('ADDED');
    } catch (err) {
      console.log('ERROR', err);
      console.log(typeof err, Object.keys(err));
      setServerError((err as Error).toString());
    }
  };

  return (
    <div className={styles.container}>
      {serverError && <FormError errorMessage={serverError} />}
      <p>
        Please specify the remote Transmission servers details so we can connect
        to this server.
      </p>
      <p>
        If you&apos;re unable to establish a connect, try connecting from the
        browser to verify it works there.
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
        <FormInput label="username" {...register('username')} />
        <FormInput type="password" label="Password" {...register('password')} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ServerSettings;
