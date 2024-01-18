import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { WaterWave } from './WaterWave'
import { IWaterWavePoint } from './index.d';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import styles from './index.module.scss';

interface ButtonProps {
  type?: 'primary' | 'danger' | 'ghost' | 'link',
  size?: 'large' | 'normal' | 'small',
  className?: string,
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  children?: React.ReactElement | string
  htmlType?: 'reset' | 'submit' | 'button'
  block?: boolean,
  waterWave?: boolean,
}

const Button = ({
  type,
  size = 'normal',
  children,
  onClick,
  className,
  htmlType = 'button',
  block = false,
  waterWave: isWaterWave = false,
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

  const [waveList, setWaveList] = useState<IWaterWavePoint[]>([]);

  const onClickHandle = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isWaterWave) {
      setWaveList([...waveList, {
        x: e.nativeEvent.offsetY,
        y: e.nativeEvent.offsetX,
        id: uuidv4(),
      }])
    }
    onClick?.();
  }, [isWaterWave, waveList, onClick]);

  return (
    <button
      type={htmlType}
      className={btnClass}
      onClick={onClickHandle}
    >
      {
        children
      }
      {
        waveList.map((waterWavePoint: IWaterWavePoint) => {
          return <WaterWave waterWavePoint={waterWavePoint} key={waterWavePoint.id} />
        })
      }
    </button>
  );
};

export default Button;