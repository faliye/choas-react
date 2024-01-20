import React, { useEffect, useRef, useState } from "react";
import { IWaterWavePoint } from "../index.d";

import styles from '../index.module.scss';

interface IWaterWaveProps {
    wavePoint?: IWaterWavePoint
    speedCoe?: number
}

type IWaterWavePointWater = IWaterWavePoint & {
    nx: number,
    ny: number,
    spd: number,
    opt: number
}

export const WaterWave = ({ wavePoint }: IWaterWaveProps) => {
    const [waveList, setWaveList] = useState<(IWaterWavePointWater)[]>([]);
    const timer = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (wavePoint) {
            if (timer.current) {
                clearInterval(timer.current);
                timer.current = null;
            }
            setWaveList([...waveList, {
                ...wavePoint,
                nx: wavePoint.x,
                ny: wavePoint.y,
                spd: 1,
                opt: 1
            }]);
        }
    }, [wavePoint]);

    useEffect(() => {
        if (waveList.length) {
            if (timer.current === null) {
                timer.current = setInterval(() => {
                    const newWaveList = waveList.map((item: IWaterWavePointWater) => {
                        item.spd += 0.05;
                        item.opt -= 0.01;
                        item.nx -= item.spd;
                        item.ny -= item.spd;
                        item.width += item.spd * 2;
                        item.height += item.spd * 2;
                        return item;
                    }).filter(item => item.width < item.pW);
                    setWaveList([...newWaveList]);
                }, 10);
            }
        } else {
            if (timer.current) {
                clearInterval(timer.current);
                timer.current = null;
            }
        }
    }, [waveList]);
    
    return <>
        {
            waveList.map(item => {
                return (
                    <div
                        key={item.id}
                        style={{
                            top: item.ny + 'px',
                            left: item.nx + 'px',
                            width: item.width + 'px',
                            height: item.height + 'px',
                            opacity: item.opt,
                        }}
                        className={styles["btn-waterWave"]}
                    />
                );
            })
        }
    </>
}