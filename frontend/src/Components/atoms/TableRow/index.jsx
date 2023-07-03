import React from 'react'
import useStyles from "./index.style"
import CustomizedProgressBars from '../ProgressBar/ProgressBar';
import CustomInvoiceViewIcon from '../InvoiceIcon/InvoiceIcon';
import StatusChip from "../StatusChip/StatusChip"

import {
    TableRow as TableRowMUI,
    TableCell,
} from '@mui/material';
import CustomPDFViewIcon from '../PdfIcon/padfIcon';
import CustomPaymentViewIcon from '../PaymentIcon/paymentIcon';
import CustomActionIcon from '../ActionIcon/CustomActionIcon';

const TableRow = ({ tableBodyData }) => {

    const custopmTableCellsStyle = {
        "default": {
            padding: '0.5rem',
            '& .MuiTableCell-root': {
                color: "white",
                borderBottom: ".05rem #272A30 solid",
            }
        },
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
        "Invoices": {
            borderBottom: ".05rem #272A30 solid",
            width: "100px",
        },
        "View": {
            borderBottom: ".05rem #272A30 solid",
            width: "100px",
            padding: '0.5rem',
        },
        "Payment": {
            borderBottom: ".05rem #272A30 solid",
            width: "100px",
            padding: '0.5rem',
        },
        "Action": { 
            padding: '0.5rem',
        },
        "Status": {
            padding: '0.5rem',
        }
    };
    const classes = useStyles();
    return (
        <TableRowMUI className={classes.tableRow} sx={custopmTableCellsStyle.default}>
            {
                Object.keys(tableBodyData).map((key) => {
                    //update budgetId to id
                    if (key !== "budgetId")  {
                        return (
                            key === "Remaining" ?
                                <TableCell sx={custopmTableCellsStyle[key]} className={classes.tableDataCellItem}><CustomizedProgressBars value={tableBodyData[key]} /></TableCell> :
                            key === 'Invoices' ?
                                <TableCell sx={custopmTableCellsStyle[key]} className={classes.tableDataCellItem}><CustomInvoiceViewIcon budgetId={tableBodyData["id"]} /></TableCell> :
                            key === 'View' ?
                                <TableCell sx={custopmTableCellsStyle[key]} className={classes.tableDataCellItem}><CustomPDFViewIcon budgetId={tableBodyData["id"]} /></TableCell> :
                            key === 'Payment' ?
                                <TableCell sx={custopmTableCellsStyle[key]} className={classes.tableDataCellItem}><CustomPaymentViewIcon budgetId={tableBodyData["id"]} /></TableCell> :
                            key === 'Action' ?
                                                <TableCell sx={custopmTableCellsStyle[key]} className={classes.tableDataCellItem}><CustomActionIcon budgetId={tableBodyData["id"]} /></TableCell> :
                                                key === 'Status' ? <TableCell sx={custopmTableCellsStyle[key]} className={classes.tableDataCellItem}><StatusChip status={tableBodyData[key]} /></TableCell> :
                                                    
                                             
                                                
                                <TableCell sx={[custopmTableCellsStyle[key], custopmTableCellsStyle.default]} className={classes.tableDataCellItem}>{tableBodyData[key]}</TableCell>
                        )
                    }
                    return null;
                })}
        </TableRowMUI>
    )
}

export default TableRow
