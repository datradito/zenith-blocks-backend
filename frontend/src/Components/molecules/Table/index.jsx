import React from 'react'
import TableBody from "../TableBody/index"
import TableHeader from "../../atoms/TableHeader/index"

import {
    Table as TableMUI,
    Box
} from '@mui/material';

import useStyle from "./index.style"

function Table({ tableHeaderData, tableBodyData }) {

    const classes = useStyle();
    const renderTable = () => {
        return (
            <TableMUI className={classes.tableBodySection}>
                <TableHeader tableHeaderData={tableHeaderData} />
                <TableBody
                    tableBodyData={tableBodyData} />
            </TableMUI>
        )
    }

    const renderEmptyTable = () => {
        return (
            <div>
                <TableHeader tableHeaderData={tableHeaderData} />
                <p>No data</p>
            </div>
        )
    }
    return (
        <Box sx={{ margin: '0 1rem' }}>
            {tableBodyData && tableBodyData.length > 0 ? renderTable() : renderEmptyTable()}
        </Box>
    )
}

export default Table
