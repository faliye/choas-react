import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './index.module.scss'

interface IPaginationProps {
    total: number,
    currentPage?: number,
    pageSize?: number,
    size?: 'large' | 'normal' | 'small',
    onPaginationChange?: (page: number) => void,
}



const Pagination = ({
    total = 0,
    pageSize = 10,
    size = 'normal',
    onPaginationChange,
}: IPaginationProps) => {
    const [page, setPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(1);

    const paginationClass = classNames({
        [styles["pagination"]]: true,
    });

    const paginationItemClass = classNames({
        [styles["pagination-item"]]: true,
        [styles["pagination-item-large"]]: size === 'large',
        [styles["pagination-item-normal"]]: size === 'normal',
        [styles["pagination-item-small"]]: size === 'small',
    });

    useEffect(() => {
        if (total) {
            setPage(1);
        }
        const maxPage = Math.floor(total / pageSize);
        if (maxPage > 1) {
            setMaxPage(maxPage);
        }
    }, [total, pageSize]);

    const EllispsePaginationItem = ({
        keyName,
        paginationItemClass
    }: { keyName: string, paginationItemClass: string }) => (
        <div
         key={keyName} 
         className={paginationItemClass}
          style={{ border: 'none' }}>...</div>
    )

    const createpPaginationItems = useCallback(() => {
        const paginationItem = new Array(maxPage).fill(1).map((i, index: number) => {
            const currentPage: number = index + 1;
            return (
                <div
                    key={index}
                    className={
                        paginationItemClass +
                        (page === currentPage ? ' ' + styles["pagination-item-active"] : '')
                    }
                    onClick={() => {
                        setPage(currentPage);
                        onPaginationChange?.(currentPage);
                    }}
                >{index + 1}</div>
            )
        });
        if (maxPage === 1) {
            return paginationItem;
        }
        const showCount: number = 5;
        if (page < showCount) {
            paginationItem.splice(
                maxPage - showCount,
                maxPage - showCount - 1,
                <EllispsePaginationItem
                    key={'rightEllispse'}
                    paginationItemClass={paginationItemClass}
                    keyName='rightEllispse'
                />
            );
        } else if (page > maxPage - showCount + 1) {
            paginationItem.splice(
                1,
                maxPage - showCount - 1,
                <EllispsePaginationItem
                    key={'leftEllispse'}
                    paginationItemClass={paginationItemClass}
                    keyName='leftEllispse'
                />
            );
        } else {
            const half = Math.floor(showCount / 2);
            paginationItem.splice(
                page + half,
                maxPage - page - half - 1,
                <EllispsePaginationItem
                    key={'rightEllispse'}
                    paginationItemClass={paginationItemClass}
                    keyName='rightEllispse'
                />
            );
            paginationItem.splice(
                1,
                page - half - 1,
                <EllispsePaginationItem
                    key={'leftEllispse'}
                    paginationItemClass={paginationItemClass}
                    keyName='leftEllispse'
                />
            );
        }
        return paginationItem;
    }, [maxPage, page]);

    return <div className={paginationClass}>
        <div
            key="quickLeftJump"
            className={paginationItemClass}
        >
            &lt;&lt;
        </div>
        <div
            key="leftJump"
            className={paginationItemClass}
        >
            &lt;
        </div>
        <div style={{ display: 'flex' }}>
            {createpPaginationItems()}
        </div>
        <div
            className={paginationItemClass}
            key="rightJump"
        >
            &gt;
        </div>
        <div
            className={paginationItemClass}
            key="quickRightJump"
        >
            &gt;&gt;
        </div>
    </div>
}

export default Pagination;