import React, { Children } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

interface ButtonProps {
  type?: 'primary' | 'danger' | 'ghost' | 'link',
  size?: 'large' | 'normal' | 'small',
  className?: string,
  onClick?: () => void,
  children?: React.ReactElement | string
  htmlType?: 'reset' | 'submit' | 'button'
  block?: boolean
}

let cx = classNames.bind({
  btn: styles.btn,
  primary: styles['btn-primary'],
  danger: styles['btn-danger'],
  ghost: styles['btn-ghost'],
  link: styles['btn-link'],
  large: styles['btn-large'],
  normal: styles['btn-normal'],
  small: styles['btn-small'],
  block: styles['btn-block'],
});

const Button = ({
  type,
  size = 'normal',
  children,
  onClick,
  className,
  htmlType = 'button',
  block = false
}: ButtonProps) => {
  const btnClass = cx({
    btn: true,
    primary: type === 'primary',
    danger: type === 'danger',
    ghost: type === 'ghost',
    link: type === 'link',
    [className as string]: true,
    large: size === 'large',
    normal: size === 'normal',
    small: size === 'small',
    block
  });

  return (
    <button
      type={htmlType}
      className={btnClass}
      onClick={onClick}
    >
      {
        children
      }
    </button>
  );
};

export default Button;