import React, { useEffect, useRef, useState } from "react";
import { ITableDataItem, ITableColumn } from "../index.d";

interface ITableHeaderProps {
    data: ITableDataItem[][],
    dataKey: string[],
}

const TableBody = ({ data, dataKey }: ITableHeaderProps) => {

    return (
        <tbody>
            {
                data.map((d: ITableDataItem[], index: number) => {
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