import React from 'react';
import { ITableData, ITableColumn } from './index.d'
import TableHeader from './TableHeader';
import TableBody from './TableBody';

interface ITableProps {
    data: ITableData,
    columns: ITableColumn[],
}

const Table = ({
    data,
    columns,
}: ITableProps) => {
    return (
        <table>
            <TableHeader columns={columns} />
            <TableBody columns={columns} data={data} />
        </table>
    );
}

export default Table;