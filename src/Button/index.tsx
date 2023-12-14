import React from 'react';
import classname from 'classnames'
import styles from './index.sass';

interface ButtonProps {
  children: React.ReactNode,
  type?: 'primary' | 'danger' | 'normal' | 'dot' | 'link',
  className?: string,
  onClick?: () => void,
  render?: () => React.ReactNode
}

const Button = ({
  children,
  type = 'normal',
  render,
  onClick,
  className,
}: ButtonProps) => {
  const btnClass = classname({
    [styles['Button']]: true,
    [styles['Button']]: type === 'primary',
    [styles['Button']]: type === 'danger',
    [styles['Button']]: type === 'normal',
    [styles['Button']]: type === 'dot',
    [styles['Button']]: type === 'link',
    className,
  });

  return (
    <button
      type="button"
      className={btnClass}
      onClick={onClick}
    >
      {
        children ? children : render?.()
      }
    </button>
  );
};

export default Button;