import React from 'react'

import {
    TableRow,
    TableHead,
    TableCell,
    Paper
} from '@mui/material';

import useStyles from './index.style';


const TableHeader = ({ tableHeaderData }) => {
    
    const classes = useStyles();

    return (
        <TableHead className={classes.tableHeaderCell}>
            <TableRow className={classes.tableHeaderCell}>
                {
                    tableHeaderData.map((item) => {
                        return <TableCell className={classes.tableDataCell}>{item}</TableCell>
                    })
                }
            </TableRow>
        </TableHead>
    )
}

export default TableHeader
