import styles from './Error.module.scss';

interface Props {
  errorMessage: string;
}

function FormError({ errorMessage }: Props) {
  if (!errorMessage) {
    return null;
  }

  return <div className={styles.container}>{errorMessage}</div>;
}

export default FormError;
