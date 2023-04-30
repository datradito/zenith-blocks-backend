import React from 'react'
import useStyles from "./index.style"

import {
    TableRow as TableRowMUI,
    TableCell,
} from '@mui/material';

const TableRow = ({ tableBodyData }) => {
    const classes = useStyles();
    return (
        <TableRowMUI className={classes.tableDataCell}>
            {
            Object.keys(tableBodyData).map((key) => {
                return (
                    <TableCell className={classes.tableDataCellItem}>{tableBodyData[key]}</TableCell>
            )
            })}
        </TableRowMUI>
    )
}

export default TableRow
