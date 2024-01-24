import React, { useCallback, useEffect, useState } from 'react';
import { ITableData, ITableColumn, IDataEntries } from './index.d'
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import Pagination from '../Pagination';

import classNames from 'classnames';

import styles from './index.module.scss';

interface ITableProps {
    data: ITableData,
    columns: ITableColumn[],
    width?: number,
    size?: 'large' | 'normal' | 'small',
    renderTFooter?: (data: ITableData, columns: ITableColumn[]) => React.ReactElement
    isShowPagination?: boolean,
    pagination?: {
        onChange?: (page: number) => void,
        pageSize?: number,
    },
}

export const setDataEntries = (
    columns: ITableColumn[],
    dataEntries: IDataEntries[] = [],
) => {
    columns.forEach((item: ITableColumn) => {
        if (item.children) {
            return setDataEntries(item.children, dataEntries);
        } else {
            if (dataEntries.every(dataEntry => dataEntry.key !== item.key)) {
                dataEntries.push({
                    key: item.key,
                    item,
                });
            }
        }
    })
    return dataEntries;
}

const Table = ({
    data,
    columns,
    size = 'normal',
    width = undefined,
    renderTFooter = undefined,
    isShowPagination = true,
    pagination = {},
}: ITableProps) => {
    const [page, setPage] = useState<number>(1);

    const [showData, setShowData] = useState<ITableData>([]);
    const [dataWithKey, setDataWithKey] = useState<IDataEntries[]>([]);

    const { pageSize = 10 } = pagination;

    const tableClass = classNames(styles.table, {
    });

    const onPaginationChangeHandle = useCallback((page: number) => {
        setPage(page);
        pagination?.onChange?.(page);
    }, [pagination]);

    useEffect(() => {
        if (data.length > pageSize) {
            setShowData(data.slice((page - 1) * pageSize, page * pageSize));
        } else {
            setShowData(data);
        }
    }, [data, pageSize, page]);

    useEffect(() => {
        setDataWithKey(setDataEntries(columns));
    }, [columns]);

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
                    data={showData}
                    dataWithKey={dataWithKey}
                />
                <TableFooter
                    renderTFooter={renderTFooter}
                    data={showData}
                    columns={columns}
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