import React from "react";
import classNames from 'classnames';

import { ITableDataItem, IDataEntries } from "../index.d";

import styles from '../index.module.scss'

interface ITableHeaderProps {
    data: ITableDataItem[][],
    dataWithKey: IDataEntries[],
}

const TableBody = ({ data, dataWithKey }: ITableHeaderProps) => {

    const trClass = classNames({
        [styles["table-tr"]]: true,
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
                                dataWithKey.map((key: IDataEntries) => {
                                    const item = d.find(item => item.key === key.key);
                                    const tdClass = classNames({
                                        [styles["table-align-left"]]: !key.item.align || key.item.align === 'left',
                                        [styles["table-align-center"]]: key.item.align === 'center',
                                        [styles["table-align-right"]]: key.item.align === 'right',
                                    });
                                    item
                                    return (
                                        <td
                                            key={item?.key}
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