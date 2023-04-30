import React, {useEffect}  from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const paginationElement = {
    color: 'white',
}

export default function PaginationControlled({ handleSkip }) {
    const [page, setPage] = React.useState(1);

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
            {/* <Typography>Page: {page}</Typography> */}
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