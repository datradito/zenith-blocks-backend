import React from 'react'
import TableRow from "../../atoms/TableRow/index"
import {
    TableBody as TableBodyMUI,
} from '@mui/material';

import useStyles from "./index.style"

const TableBody = ({ tableBodyData }) => {

    const classes = useStyles();
    return (
        <TableBodyMUI className={classes.tableBody}>
                {
                    tableBodyData.map((item, index )=> {
                        return <TableRow
                            key={index}
                            tableBodyData={item} />
                    })
                }
        </TableBodyMUI>
    )
}

export default TableBody
