import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

interface ButtonProps {
  btnTxt: 'string',
  type?: 'primary' | 'danger' | 'ghost' | 'link',
  size?: 'large' | 'normal' | 'small',
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
  large: styles['btn-large'],
  normal: styles['btn-normal'],
  small: styles['btn-small'],
});

const Button = ({
  btnTxt,
  type,
  size = 'normal',
  render,
  onClick,
  className,
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
  });

  return (
    <button
      type="button"
      className={btnClass}
      onClick={onClick}
    >
      {
        btnTxt ? btnTxt : render?.()
      }
    </button>
  );
};

export default Button;