// import type React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon?: React.ReactNode;
  isLoading?: boolean;
  children?: string | React.ReactNode;
};

function Button({ icon, className, isLoading, children, ...props }: Props) {
  return (
    <button
      className={classNames(
        styles.button,
        className,
        isLoading && styles.loading,
        icon && !children && styles.iconButton
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

export default Button;
