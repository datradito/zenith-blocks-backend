import React from 'react'
import useStyles from "./index.style"
import CustomizedProgressBars from '../ProgressBar/ProgressBar';
import CustomInvoiceViewIcon from '../InvoiceIcon/InvoiceIcon';

import {
    TableRow as TableRowMUI,
    TableCell,
} from '@mui/material';

const TableRow = ({ tableBodyData }) => {

    const custopmTableCellsStyle = {
        "Allocated Budget": {
            width: '150px'
        },
        "Currency": {
            width: '50px'
        },
        "Breakdown": {
            width: '100px'
        },
        "Categories": {
            maxWidth: '300px'
        },
        "Remaining": {
            color: "white",
            borderBottom: ".05rem #272A30 solid",

        },
        "View": {
            borderBottom: ".05rem #272A30 solid",
            width: "100px",
        }
    };
    const classes = useStyles();
    return (
        <TableRowMUI className={classes.tableRow}>
            {
                Object.keys(tableBodyData).map((key) => {
                    if (key !== "id") {
                        return (
                            key == "Remaining" ?
                                <TableCell sx={custopmTableCellsStyle[key]} className={classes.tableDataCellItem}><CustomizedProgressBars value={tableBodyData[key]} /></TableCell> :
                            key == 'View' ?
                                    <TableCell sx={custopmTableCellsStyle[key]} className={classes.tableDataCellItem}><CustomInvoiceViewIcon budgetId={tableBodyData["id"]} /></TableCell> :
                                <TableCell sx={custopmTableCellsStyle[key]} className={classes.tableDataCellItem}>{tableBodyData[key]}</TableCell>
                        )
                    }
                    return null;
                })}
        </TableRowMUI>
    )
}

export default TableRow
