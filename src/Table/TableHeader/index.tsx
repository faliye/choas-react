import React from "react";
import { ITableColumn } from "../index.d";

interface ITableHeaderProps {
    columns: ITableColumn[]
}

const TableHeader = ({ columns }: ITableHeaderProps) => {
    return (
        <thead>
            <tr>
                {
                    columns.map((item: ITableColumn) => {
                        return (
                            <th key={item.key}>{item.title} </th>
                        )
                    })
                }
            </tr>
        </thead>
    )
}

export default TableHeader