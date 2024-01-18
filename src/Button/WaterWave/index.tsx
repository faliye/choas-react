import React, { useEffect, useRef } from "react";
import { IWaterWavePoint } from "../index.d";

import styles from '../index.module.scss';

interface IWaterWaveProps {
    waterWavePoint: IWaterWavePoint
    removeHandler: (id: string) => void
    isBlock: boolean
}

export const WaterWave = ({ waterWavePoint, removeHandler, isBlock }: IWaterWaveProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const timer = useRef<NodeJS.Timeout | null>(null);
    const speed = isBlock ? 12 : 4;
    useEffect(() => {
        timer.current = setInterval(() => {
            if (divRef.current) {
                if (divRef.current?.style) {
                    const { x, y, pW, pH, moveDirectY, moveDirectX } = waterWavePoint;
                    let top = parseInt(divRef.current.style.top);
                    let left = parseInt(divRef.current.style.left);
                    top = isNaN(top) ? y : top;
                    left = isNaN(left) ? x : left;
                    if (moveDirectX > 0) {
                        if (left > 0) {
                            divRef.current.style.left = left - speed / 2 + 'px';
                        }
                        if (divRef.current.clientWidth > pW + x) {
                            removeHandler(waterWavePoint.id);
                        }
                    } else {
                        if (left > 0) {
                            divRef.current.style.left = left - speed / 2 + 'px';
                        } else {
                            removeHandler(waterWavePoint.id);
                        }
                    }
                    divRef.current.style.top = (top - speed / 2) + 'px';
                    divRef.current.style.width = divRef.current?.clientWidth + speed + 'px';
                    divRef.current.style.height = divRef.current?.clientHeight + speed + 'px';
                    divRef.current.style.opacity = parseInt(divRef.current.style.opacity) + 0.1 + ''
                }
            }
        }, 16);
        return () => {
            if (timer.current) {
                clearInterval(timer.current);
            }
        }
    }, [divRef.current]);

    return (
        <div
            ref={divRef}
            className={styles["btn-waterWave"]}
        />
    );
}