import React from 'react'
import TableRow from "../../atoms/TableRow/index"
import {
  TableCell,
  TableRow as MuiTableRow,
  Table as TableMUI,
  Box
} from "@mui/material";
import EmptyIcon from '../../atoms/EmptyIcon/EmptyIcon';

const tableHeaderStyles = {
    tableHeaderCell: {
    padding: "0 rem",
    border: ".05rem #272A30 solid", // Set default font size for table header cells
    },
    tableDataCell: {
    borderBottom: ".05rem #272A30 solid",
    },
    tableDataCellItem: {
    color: "white",
    fontSize: "0.75rem",
    border: "none",
    padding: "0.5rem",
    backgroundColor: "rgba(40, 42, 46, 0.5)",
    },
};


function Table({ tableHeaderData, tableBodyData }) {

    const renderTable = () => {
      return (
        <Box>
          <TableMUI sx={{ border: "none" }}>
            <MuiTableRow>
              {tableHeaderData.map((item, index) => (
                <TableCell key={index} sx={tableHeaderStyles.tableDataCellItem}>
                  {item}
                </TableCell>
              ))}
            </MuiTableRow>
            {tableBodyData !== null &&
              tableBodyData.map((item, index) => (
                <TableRow key={index} tableBodyData={item} />
              ))}
          </TableMUI>
          {tableBodyData === null && <EmptyIcon />}
        </Box>
      );
    };

    return renderTable();
}
export default Table
