import React from 'react';
import styles from './index.sass';

interface ButtonProps {
}

export const Button = ({
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={styles['button']}
    >
      123
    </button>
  );
};
