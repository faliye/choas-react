import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
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
  const btnClass = classNames(styles.btn, {
    [styles["btn-primary"]]: type === 'primary',
    [styles["btn-danger"]]: type === 'danger',
    [styles["btn-ghost"]]: type === 'ghost',
    [styles["btn-link"]]: type === 'link',
    [styles["btn-large"]]: size === 'large',
    [styles["btn-normal"]]: size === 'normal',
    [styles["btn-small"]]: size === 'small',
    [styles["btn-block"]]: block
  }, className);

  const onClickHandle = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (waterWave) {
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