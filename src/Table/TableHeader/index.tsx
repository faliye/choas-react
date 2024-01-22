import React, { useEffect, useState } from "react";
import { ITableColumn } from "../index.d";

interface ITableHeaderProps {
    columns: ITableColumn[]
    size?: 'large' | 'normal' | 'small',
}

export const setDataEntries = (columns: ITableColumn[], dataEntries: ITableColumn[][] = [], lv: number = 0) => {
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
                                    return (
                                        <th
                                            rowSpan={item.rowSpan}
                                            colSpan={item.colSpan}
                                            key={item.key}
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