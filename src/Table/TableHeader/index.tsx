import React, { useEffect, useState } from "react";
import { ITableColumn } from "../index.d";
import classNames from 'classnames';
import styles from '../index.module.scss';

interface ITableHeaderProps {
    columns: ITableColumn[],
    size?: 'large' | 'normal' | 'small',
}

export const setDataEntries = (
    columns: ITableColumn[],
    dataEntries: ITableColumn[][] = [],
    lv: number = 0
) => {
    dataEntries[lv] = dataEntries[lv] || [];
    columns.forEach((item: ITableColumn) => {
        dataEntries[lv].push(item);
        if (item.children) {
            return setDataEntries(item.children, dataEntries, lv + 1);
        }
    })
    return dataEntries;
}

const TableHeader = ({ columns }: ITableHeaderProps) => {
    const [columnsByLv, setColumnsByLv] = useState<ITableColumn[][]>([]);

    useEffect(() => {
        setColumnsByLv(setDataEntries(columns));
    }, [columns]);

    return (
        <thead>
            {
                columnsByLv.map((columns: ITableColumn[], index: number) => {
                    return (
                        <tr key={index}>
                            {
                                columns.map((item: ITableColumn) => {
                                    const tdClass = classNames({
                                        [styles["table-align-left"]]: !item.align || item.align === 'left',
                                        [styles["table-align-center"]]: item.align === 'center',
                                        [styles["table-align-right"]]: item.align === 'right',
                                    });
                                    return (
                                        <th
                                            rowSpan={item.rowSpan}
                                            colSpan={item.colSpan}
                                            key={item.key}
                                            className={tdClass}
                                        >
                                            {
                                                item.title
                                            }
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    )
                })
            }

        </thead>
    )
}

export default TableHeader