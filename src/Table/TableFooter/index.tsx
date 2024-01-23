import React, { ReactElement, useCallback } from 'react';
import { ITableColumn, ITableData } from '../index.d';
import classNames from 'classnames';


import styles from '../index.module.scss'

interface ITableFooter {
    renderTFooter?: (data: ITableData, columns: ITableColumn[]) => ReactElement,
    data: ITableData,
    columns: ITableColumn[],
}

const TableFooter = ({ renderTFooter, data, columns }: ITableFooter) => {

    const trClass = classNames({
        [styles["table-tr"]]: true,
    });

    const tdClass = classNames({
        [styles["table-td"]]: true,
    });

    const addElementClass = useCallback((ele: ReactElement): ReactElement => {
        const { className: preClassName = '', children: preChildren = [] } = ele.props || {};
        let children: ReactElement[] | null = [];
        let className: string | null = '';
        if (preChildren) {
            const len = preChildren.length;
            if (len) {
                for (let i = 0; i < len; i++) {
                    const node = preChildren[i]?.props?.children;
                    if (typeof node !== 'object') {
                        children?.push(preChildren[i]);
                    } else {
                        children?.push(addElementClass(preChildren[i]));
                    }
                }
            } else {
                children?.push(preChildren);
            }
        }

        if (ele.type == 'tr') {
            className = preClassName + ` ${trClass}`;
        }
        if (ele.type == 'td') {
            className = preClassName + ` ${tdClass}`;
        }
        const newElement = React.createElement(ele.type, {
            ...ele.props,
            className,
            children,
        });
        return newElement;
    }, []);

    if (!renderTFooter) {
        return null;
    }
    return (
        <tfoot>
            {
                addElementClass(renderTFooter?.(data, columns))
            }
        </tfoot>
    )
}

export default TableFooter;