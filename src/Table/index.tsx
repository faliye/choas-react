import React, { useCallback, useState } from 'react';
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
    isShowPagination?: boolean,
    pagination?: {
        onChange?: (page: number) => void,
        pageSize?: number
    }
}

const Table = ({
    data,
    columns,
    size = 'normal',
    width = undefined,
    isShowPagination = true,
    pagination = {}
}: ITableProps) => {
    const [page, setPage] = useState<number>(1);

    const tableClass = classNames(styles.table, {
    });

    const onPaginationChangeHandle = useCallback((page: number) => {
        setPage(page);
        pagination?.onChange?.(page);
    }, [pagination])
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
                <TableBody
                    columns={columns}
                    data={data}
                    page={page}
                    pageSize={pagination.pageSize}
                />
            </table>
            {
                isShowPagination && (
                    <Pagination
                        size={size}
                        total={data.length}
                        pageSize={pagination.pageSize}
                        onPaginationChange={onPaginationChangeHandle}
                    />
                )
            }
        </div>
    );
}

export default Table;