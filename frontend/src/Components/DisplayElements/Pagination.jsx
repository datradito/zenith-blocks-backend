import React, {useEffect, useState}  from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const paginationElement = {
    color: 'white',
    '& .MuiPaginationItem-root': {
        color: 'white',
        '&.Mui-selected': {
            backgroundColor: '#1A65C0',
            color: 'white',
        },
    }
}

const PaginationControlled = ({ handleSkip }) => {
    const [page, setPage] = useState(1);

    useEffect(() => {
        const currentPage = localStorage.getItem('currentPage');
        if (currentPage) {
            setPage(parseInt(currentPage));
        }
    }, []);

    const handleChange = (event, value) => {
        localStorage.setItem('currentPage', value);
        setPage(value);
    };

    return (
        <Stack
            spacing={2}>
            <Pagination
                value={page}
                count={499}
                page={page}
                onChange={handleChange}
                onClick={handleSkip}
                sx = {paginationElement}
            />
        </Stack>
    );
}

export default PaginationControlled;