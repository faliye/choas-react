import React, { useEffect, useRef, useState } from "react";
import { ITableDataItem, ITableColumn } from "../index.d";

interface ITableHeaderProps {
    data: ITableDataItem[],
    columns: ITableColumn[],
    size?: 'large' | 'normal' | 'small',
}

export const setDataEntries = (columns: ITableColumn[], dataEntries: string[] = []) => {
    columns.forEach((item: ITableColumn) => {
        if (item.children) {
            return setDataEntries(item.children, dataEntries);
        } else {
            if (dataEntries.every(key => key !== item.key)) {
                dataEntries.push(item.key)
            }
        }
    })
    return dataEntries;
}

const TableBody = ({ data, columns }: ITableHeaderProps) => {
    const [dataKey, setDataKey] = useState<string[]>([]);

    useEffect(() => {
        setDataKey(setDataEntries(columns));
    }, [columns]);
    return (
        <tbody>
            <tr>
                {
                    dataKey.map((key: string) => {
                        const item = data.find(item => item.key === key);
                        return (
                            <td
                                key={key}
                            >
                                {
                                    item?.value
                                }
                            </td>
                        )
                    })
                }
            </tr>
        </tbody>
    )
}

export default TableBody;