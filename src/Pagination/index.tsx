import React, { useEffect, useState } from 'react';

interface IPaginationProps {
    total: number,
    currentPage?: number 
    onPaginationChange?: (page: number) => void
}


const Pagination = ({ total, onPaginationChange }: IPaginationProps) => {
    const [page, setPage] = useState<number>(0);
    useEffect(()=>{
        if(total){
            setPage(1)
        }
    }, [total]);

    return <div>
        <div>quickLeft</div>
        <div>left</div>
        <div>middle</div>
        <div>right</div>
        <div>quickLeft</div>
    </div>
}

export default Pagination;