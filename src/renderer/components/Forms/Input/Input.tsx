import { forwardRef } from 'react';
import styles from './Input.module.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ label, name, ...props }, ref) => {
    return (
      <div className={styles.container}>
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        <input
          ref={ref}
          id={name}
          name={name}
          className={styles.input}
          {...props}
        />
      </div>
    );
  }
);

export default FormInput;
