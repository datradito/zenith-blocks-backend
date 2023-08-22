import React from 'react'
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
import Avatar from '@mui/material/Avatar';

const TableRow = ({ tableBodyData }) => {
    //this is where you can introduce filtering for the table data

    //Todo: check if user came from proposal detail page, if yes then filter the tableBodyData based on budgetId
    //Todo: if there is not any data for budgetId then render createInvoice button and inform user that no invoices have been coded to this budget yet

    const customTableCellStyles = {
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
        },
        "Logo": {
            width: '250px',
            borderRadius: '50%',
            marginRight: '1rem',
        },
        "Balance": {
            width: '250px',
        },
        "Value": {
            width: '250px',
        },
        tableRow: {
            borderTop: ".05rem #272A30 solid",
            borderBottom: ".05rem #272A30 solid",
        },
        tableDataCellItem: {
            color: "white",
            padding: '0.5rem',
            border: 'inherit',
        }
    };

    console.log(tableBodyData)

    return (
        <TableRowMUI sx={[customTableCellStyles.tableRow, customTableCellStyles.default]}>
            {
                Object.keys(tableBodyData).map((key) => {
                    //update budgetId to id
                    if (key !== "id" && key !== "budgetId" && key !== "proposalid" && key !== "InvoiceId")  {
                        return (
                            key === "Remaining" ?
                                <TableCell key={ key} sx={[customTableCellStyles[key] , customTableCellStyles.tableDataCellItem]}><CustomizedProgressBars value={tableBodyData[key]} /></TableCell> :
                            key === 'Invoices' ?
                                <TableCell key={key} sx={[customTableCellStyles[key] , customTableCellStyles.tableDataCellItem]}><CustomInvoiceViewIcon budgetId={tableBodyData["id"]} /></TableCell> :
                            key === 'View' ?
                                <TableCell key={key}  sx={[customTableCellStyles[key] , customTableCellStyles.tableDataCellItem]}><CustomPDFViewIcon budgetId={tableBodyData["id"]} /></TableCell> :
                            key === 'Payment' ?
                                <TableCell key={key}  sx={[ customTableCellStyles[key] , customTableCellStyles.tableDataCellItem ]}><CustomPaymentViewIcon invoiceId={tableBodyData["InvoiceId"]} /></TableCell> :
                            key === 'Action' ?
                                <TableCell key={key}  sx={[customTableCellStyles[key] , customTableCellStyles.tableDataCellItem]}><CustomActionIcon budgetId={tableBodyData["id"]} /></TableCell> :
                            key === 'Status' ?
                                                    <TableCell key={key} sx={[customTableCellStyles[key], customTableCellStyles.tableDataCellItem]}><StatusChip status={tableBodyData[key]} /></TableCell> :
                                                    key === 'Logo' ?
                                                        <TableCell key={key} sx={[customTableCellStyles[key], customTableCellStyles.tableDataCellItem]}><Avatar alt="Currency logo" src={tableBodyData[key]} /></TableCell> :
                                                    key === 'Breakdown' ?
                                                        <TableCell key={key} sx={[customTableCellStyles[key] , customTableCellStyles.tableDataCellItem]}>{tableBodyData[key].toFixed(2)} %</TableCell> :
                                <TableCell key={key} sx={[customTableCellStyles[key], customTableCellStyles.default, customTableCellStyles.tableDataCellItem]}>{tableBodyData[key]}</TableCell>
                        )
                    }
                    return null;
                })}
        </TableRowMUI>
    )
}

export default TableRow
