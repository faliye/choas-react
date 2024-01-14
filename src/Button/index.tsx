import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

interface ButtonProps {
  type?: 'primary' | 'danger' | 'ghost' | 'link',
  size?: 'large' | 'normal' | 'small',
  className?: string,
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  children?: React.ReactElement | string
  htmlType?: 'reset' | 'submit' | 'button'
  block?: boolean,
  waterWave?: false,
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
  block = false,
  waterWave = false,
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
  
  const onClickHandle = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(waterWave){
      console.log(123);
    }
    onClick?.();
  }, [waterWave, onClick]);

  return (
    <button
      type={htmlType}
      className={btnClass}
      onClick={onClickHandle}
    >
      {
        children
      }
    </button>
  );
};

export default Button;