import React, { useEffect, useState } from 'react';
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
    useEffect(() => {
        if (total) {
            setPage(1)
        }
        const maxPage = Math.floor(total / pageSize);
        if (maxPage > 1) {
            setMaxPage(maxPage)
        }
    }, [total, pageSize]);
    const paginationClass = classNames({
        [styles["pagination"]]: true
    });
    const paginationItemClass = classNames({
        [styles["pagination-item"]]: true,
        [styles["pagination-item-large"]]: size === 'large',
        [styles["pagination-item-normal"]]: size === 'normal',
        [styles["pagination-item-small"]]: size === 'small',
    });

    return <div className={paginationClass}>
        <div className={paginationItemClass}>quickLeft</div>
        <div className={paginationItemClass}>left</div>
        <div>
            <div className={paginationItemClass}>
                1
            </div>
            {
                maxPage > 0 ? (
                    <div className={paginationItemClass}>{maxPage}</div>
                ) : null
            }

        </div>
        <div className={paginationItemClass}>right</div>
        <div className={paginationItemClass}>quickLeft</div>
    </div>
}

export default Pagination;