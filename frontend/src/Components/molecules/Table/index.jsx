import React from 'react'
import TableBody from "../TableBody/index"
import TableHeader from "../../atoms/TableHeader/index"
import CircularIndeterminate from '../../atoms/Loader/loader';

import {
    Table as TableMUI,
    Box
} from '@mui/material';


function Table({ tableHeaderData, tableBodyData }) {

    const renderTable = () => {
        return (
            <TableMUI sx={{ border: "none" }}>
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
