import React from 'react';
import { ITableData, ITableColumn } from './index.d'
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import classNames from 'classnames';

import styles from './index.module.scss';

interface ITableProps {
    data: ITableData,
    columns: ITableColumn[],
}

const Table = ({
    data,
    columns,
}: ITableProps) => {

    const tableClass = classNames(styles.table, {
    });

    return (
        <table className={tableClass} border={1}>
            <TableHeader columns={columns} />
            <TableBody columns={columns} data={data} />
        </table>
    );
}

export default Table;