import classNames from 'classnames';
import styles from './Button.module.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactChild;
}

function Button({ children, className, ...buttonProps }: Props) {
  return (
    <button
      type="button"
      {...buttonProps}
      className={classNames(className, styles.container)}
    >
      {children}
    </button>
  );
}

export default Button;
