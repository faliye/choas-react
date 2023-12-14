import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

interface ButtonProps {
  children: React.ReactNode,
  type?: 'primary' | 'danger' | 'ghost' | 'link',
  className?: string,
  onClick?: () => void,
  render?: () => React.ReactNode
}

let cx = classNames.bind({
  btn: styles.btn,
  primary: styles['btn-primary'],
  danger: styles['btn-danger'],
  ghost: styles['btn-ghost'],
  link: styles['btn-link'],
});

const Button = ({
  children,
  type,
  render,
  onClick,
  className,
}: ButtonProps) => {
  const a = styles.button
  const btnClass = cx({
    btn: true,
    primary: type === 'primary',
    danger: type === 'danger',
    ghost: type === 'ghost',
    link: type === 'link',
    [className as string]: true,
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