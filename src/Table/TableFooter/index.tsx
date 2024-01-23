import React from 'react';
import { ITableColumn, ITableData } from '../index.d';

interface ITableFooter {
    renderTFooter?: (data: ITableData, columns: ITableColumn[]) => React.ReactElement
    data: ITableData,
    columns: ITableColumn[],
}

const TableFooter = ({ renderTFooter, data, columns }: ITableFooter) => {
    if(!renderTFooter){
        return
    }
    return (
        <tfoot>
            {
                renderTFooter?.(data, columns)
            }
        </tfoot>
    )
}

export default TableFooter;