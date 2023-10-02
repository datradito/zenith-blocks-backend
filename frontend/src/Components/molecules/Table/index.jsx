import React from 'react'
import CircularIndeterminate from '../../atoms/Loader/loader';
import TableRow from "../../atoms/TableRow/index"
import { TableCell, TableRow as MuiTableRow} from "@mui/material";

import {
    Table as TableMUI,
    Box
} from '@mui/material';

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
          <TableMUI sx={{ border: "none" }}>
            <MuiTableRow>
              {tableHeaderData.map((item, index) => {
                return (
                  <TableCell
                    key={index}
                    sx={tableHeaderStyles.tableDataCellItem}
                  >
                    {item}
                  </TableCell>
                );
              })}
            </MuiTableRow>
            {tableBodyData.map((item, index) => {
              return <TableRow key={index} tableBodyData={item} />;
            })}
          </TableMUI>
        );
    }

    const renderEmptyTable = () => {
        return (
            <CircularIndeterminate />
        )
    }
    return (
        <Box sx={{ margin: '0 1rem' }}>
            {tableBodyData && tableBodyData.length > 0 ? renderTable() : renderEmptyTable()}
        </Box>
    )
}

export default Table
