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
    const [page, setPage] = useState<number>(0);
    const [maxPage, setMaxPage] = useState<number>(0);

    const paginationClass = classNames({
        [styles["pagination"]]: true
    });

    const paginationItemClass = classNames({
        [styles["pagination-item"]]: true,
        [styles["pagination-item-large"]]: size === 'large',
        [styles["pagination-item-normal"]]: size === 'normal',
        [styles["pagination-item-small"]]: size === 'small',
    });

    useEffect(() => {
        if (total) {
            setPage(1)
        }
        const maxPage = Math.floor(total / pageSize);
        if (maxPage > 1) {
            setMaxPage(maxPage)
        }
    }, [total, pageSize]);

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
        const showCount: number = 5;
        if (page < showCount) {
            paginationItem.splice(
                maxPage - showCount,
                maxPage - showCount - 1,
                <div key='rightEllispse' className={paginationItemClass} style={{ border: 'none' }}>...</div>
            );
        } else if (page > maxPage - showCount + 1) {
            paginationItem.splice(
                1,
                maxPage - showCount - 1,
                <div key='leftEllispse' className={paginationItemClass} style={{ border: 'none' }}>...</div>
            );
        } else {
            const half = Math.floor(showCount / 2);
            paginationItem.splice(
                page + half,
                maxPage - page - half - 1,
                <div key='rightEllispse' className={paginationItemClass} style={{ border: 'none' }}>...</div>
            );
            paginationItem.splice(
                1,
                page - half - 1,
                <div key='leftEllispse' className={paginationItemClass} style={{ border: 'none' }}>...</div>
            );
        }
        return paginationItem;
    }, [maxPage, page]);

    return <div className={paginationClass}>
        <div
            className={paginationItemClass}
        >
            &lt;&lt;
        </div>
        <div className={paginationItemClass}>&lt;</div>
        <div style={{ display: 'flex' }}>
            {createpPaginationItems()}
        </div>
        <div className={paginationItemClass}>&gt;</div>
        <div className={paginationItemClass}>&gt;&gt;</div>
    </div>
}

export default Pagination;