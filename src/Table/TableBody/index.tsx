import React from "react";
import classNames from 'classnames';

import { ITableDataItem } from "../index.d";

import styles from '../index.module.scss'

interface ITableHeaderProps {
    data: ITableDataItem[][],
    dataKey: string[],
}

const TableBody = ({ data, dataKey }: ITableHeaderProps) => {

    const trClass = classNames({
        [styles["table-tr"]]: true,
    });

    const tdClass = classNames({
        [styles["table-td"]]: true,
    });

    return (
        <tbody>
            {
                data.map((d: ITableDataItem[], index: number) => {
                    return (
                        <tr
                            key={index}
                            className={trClass}
                        >
                            {
                                dataKey.map((key: string) => {
                                    const item = d.find(item => item.key === key);
                                    return (
                                        <td
                                            key={key}
                                            className={tdClass}
                                        >
                                            {item?.value}
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

export default TableBody;