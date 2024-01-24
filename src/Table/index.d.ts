export interface ITableDataItem {
    [key: string]: any,
}

export type ITableData = ITableDataItem[][];

export interface ITableColumn {
    key: string,
    title: string,
    colSpan?: number,
    rowSpan?: number,
    align?: string,
    render?: (values: any, index: number, item: ITableDataItem) => React.ReactElement,
    children?: ITableColumn[],
}

export interface IDataEntries {
    key: string,
    item: ITableColumn
}
