import React, { useCallback } from 'react';
import { ITableData, ITableColumn } from './index.d'
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from '../Pagination';
import classNames from 'classnames';

import styles from './index.module.scss';

interface ITableProps {
    data: ITableData,
    columns: ITableColumn[],
    width?: number,
    size?: 'large' | 'normal' | 'small',
    isShowPagination?: boolean
}

const Table = ({
    data,
    columns,
    size = 'normal',
    width = undefined,
    isShowPagination = true
}: ITableProps) => {

    const tableClass = classNames(styles.table, {
    });

    const onPaginationChangeHandle = useCallback((page: number) => {
        console.log(page);
    }, [])

    return (
        <div
            style={{
                width,
            }}
        >
            <table
                className={tableClass}
                border={1}
            >
                <TableHeader columns={columns} />
                <TableBody columns={columns} data={data} />
            </table>
            {
                isShowPagination && (
                    <Pagination
                        size={size}
                        total={data.length}
                        onPaginationChange={onPaginationChangeHandle}
                    />
                )
            }
        </div>
    );
}

export default Table;