import React, { CSSProperties, useCallback, useState } from 'react';
import { WaterWave } from './WaterWave'
import { IWaterWavePoint } from './index.d';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import styles from './index.module.scss';

interface ButtonProps {
  type?: 'primary' | 'danger' | 'ghost' | 'link',
  size?: 'large' | 'normal' | 'small',
  className?: string,
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void,
  children?: React.ReactElement | string,
  htmlType?: 'reset' | 'submit' | 'button',
  block?: boolean,
  disable?: boolean,
  waterWave?: boolean,
  style?: CSSProperties,
}

const Button = ({
  type,
  size = 'normal',
  children,
  onClick,
  className,
  htmlType = 'button',
  block = false,
  disable = false,
  waterWave: isWaterWave = false,
  style = {},
}: ButtonProps) => {

  const btnClass = classNames(styles.btn, {
    [styles["btn-primary"]]: type === 'primary',
    [styles["btn-danger"]]: type === 'danger',
    [styles["btn-ghost"]]: type === 'ghost',
    [styles["btn-link"]]: type === 'link',
    [styles["btn-large"]]: size === 'large',
    [styles["btn-normal"]]: size === 'normal',
    [styles["btn-small"]]: size === 'small',
    [styles["btn-block"]]: block,
    [styles["btn-disable"]]: disable,
  }, className);

  const [wavePoint, setWavePoint] = useState<IWaterWavePoint>();

  const onClickHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disable) {
      return;
    }
    if (isWaterWave) {
      const target = e.target as HTMLButtonElement;
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const pW = target.clientWidth;
      setWavePoint({
        x,
        y,
        pW,
        width: 0,
        height: 0,
        id: uuidv4(),
      });
    }
    onClick?.();
  }, [isWaterWave, disable, onClick]);
  
  return (
    <button
      type={htmlType}
      className={btnClass}
      onClick={onClickHandler}
      style={isWaterWave ? {
        boxShadow: "none",
        ...style
      } : style}
    >
      {
        children
      }
      <div className={styles["btn-backgroud"]}>
        {
          isWaterWave ? <WaterWave wavePoint={wavePoint} /> : null
        }
      </div>
    </button>
  );
};

export default Button;