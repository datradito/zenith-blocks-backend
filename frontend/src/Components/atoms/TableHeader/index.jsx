import React from 'react'

import {
    TableRow,
    TableHead,
    TableCell,
    Paper
} from '@mui/material';


const TableHeader = ({ tableHeaderData }) => {

    const tableHeaderStyles = {
        tableHeaderCell: {
            padding: "0 rem",
            border: ".05rem #272A30 solid",// Set default font size for table header cells
        },
        tableDataCell: {
            borderBottom: ".05rem #272A30 solid",
        },
        tableDataCellItem: {
            color: "white",
            fontSize: '0.75rem',
            color: "gray",
            border: 'none',
            padding: '0.5rem',
            backgroundColor: 'rgba(40, 42, 46, 0.5)',
        }
    }

    return (
        <TableHead >
            <TableRow>
                {
                    tableHeaderData.map((item) => {
                        return <TableCell sx={tableHeaderStyles.tableDataCellItem}>{item}</TableCell>
                    })
                }
            </TableRow>
        </TableHead>
    )
}

export default TableHeader
