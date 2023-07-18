import React from 'react'
import TableBody from "../TableBody/index"
import TableHeader from "../../atoms/TableHeader/index"
import CircularIndeterminate from '../../atoms/Loader/loader';

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
