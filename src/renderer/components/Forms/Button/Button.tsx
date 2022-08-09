import styles from './Button.module.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactChild;
}

function Button({ children, ...buttonProps }: Props) {
  return (
    <button type="button" {...buttonProps} className={styles.container}>
      {children}
    </button>
  );
}

export default Button;
