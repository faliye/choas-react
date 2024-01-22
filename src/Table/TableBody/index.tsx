import React, { useEffect, useRef, useState } from "react";
import { ITableDataItem, ITableColumn } from "../index.d";

interface ITableHeaderProps {
    data: ITableDataItem[][],
    columns: ITableColumn[],
    size?: 'large' | 'normal' | 'small',
    pageSize?: number,
    page?: number,
}

export const setDataEntries = (
    columns: ITableColumn[],
    dataEntries: string[] = [],
) => {
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

const TableBody = ({ data, columns, pageSize = 10, page = 1 }: ITableHeaderProps) => {
    const [dataKey, setDataKey] = useState<string[]>([]);
    const [showData, setShowData] = useState<ITableDataItem[][]>([]);

    useEffect(() => {
        setDataKey(setDataEntries(columns));
    }, [columns]);

    useEffect(() => {
        if (data.length > pageSize) {
            setShowData(data.slice((page - 1) * pageSize, page * pageSize));
        }else{
            setShowData(data);
        }
    }, [data, pageSize, page]);

    return (
        <tbody>
            {
                showData.map((d: ITableDataItem[], index: number) => {
                    return (
                        <tr key={index}>
                            {
                                dataKey.map((key: string) => {
                                    const item = d.find(item => item.key === key);
                                    return (
                                        <td key={key}>
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