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
import excludeAttributesFromData from '../../../Services/excludeAttributesFromData';
import Menus from '../../molecules/Menus/Menus';
const customTableCellStyles = {
    default: {
    padding: "0.5rem",
    "& .MuiTableCell-root": {
        color: "white",
        borderBottom: ".05rem #272A30 solid",
    },
    },
    "Allocated Budget": {
    width: "150px",
    },
    Currency: {
    width: "50px",
    },
    Breakdown: {
    width: "200px",
    },
    Categories: {
    maxWidth: "300px",
    },
    Remaining: {
    color: "white",
    borderBottom: ".05rem #272A30 solid",
    },
    Invoices: {
    borderBottom: ".05rem #272A30 solid",
    width: "100px",
    },
    View: {
    borderBottom: ".05rem #272A30 solid",
    width: "100px",
    padding: "0.5rem",
    },
    Payment: {
    borderBottom: ".05rem #272A30 solid",
    width: "100px",
    padding: "0.5rem",
    },
    Action: {
    padding: "0.5rem",
    },
    Status: {
    padding: "0.5rem",
    },
    Logo: {
    width: "250px",
    borderRadius: "50%",
    marginRight: "1rem",
    },
    Balance: {
    width: "250px",
    },
    Value: {
    width: "250px",
    },
    tableRow: {
    borderTop: ".05rem #272A30 solid",
    borderBottom: ".05rem #272A30 solid",
    },
    tableDataCellItem: {
    color: "white",
    padding: "0.5rem",
    border: "inherit",
    },
};

const TableRow = ({ tableBodyData }) => {

  return tableBodyData.length > 0 || Object.keys(tableBodyData).length > 0 ? (
    <TableRowMUI
      sx={[customTableCellStyles.tableRow, customTableCellStyles.default]}
    >
      {Object.keys(tableBodyData).map((key) => {
        if (!excludeAttributesFromData.tableKeysToExclude.has(key)) {
          return (
            <TableCell
              key={key}
              sx={[
                customTableCellStyles[key],
                customTableCellStyles.tableDataCellItem,
              ]}
            >
              {key === "Breakdown" && (
                <CustomizedProgressBars value={tableBodyData[key]} />
              )}
              {key === "Invoices" && (
                <CustomInvoiceViewIcon budgetId={tableBodyData["id"]} />
              )}
              {key === "View" && (
                <CustomPDFViewIcon budgetId={tableBodyData["id"]} />
              )}
              {key === "Payment" && (
                <CustomPaymentViewIcon invoiceId={tableBodyData["InvoiceId"]} />
              )}
              {key === "Action" && (
                <Menus>
                  <CustomActionIcon invoiceId={tableBodyData["InvoiceId"]} />
                </Menus>
              )}
              {key === "Status" && <StatusChip status={tableBodyData[key]} />}
              {key === "Logo" && (
                <Avatar alt="Currency logo" src={tableBodyData[key]} />
              )}
              {key !== "Breakdown" &&
                key !== "Invoices" &&
                key !== "View" &&
                key !== "Payment" &&
                key !== "Action" &&
                key !== "Status" &&
                key !== "Logo" &&
                tableBodyData[key]}
            </TableCell>
          );
        }
        return null;
      })}
    </TableRowMUI>
  ) : (
      null
  );

}

export default TableRow
