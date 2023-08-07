import React from 'react'
import Table from "../molecules/Table/index"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

function TableDisplay({ tableHeaderData, tableBodyData, dataToDisplay }) {
    
    return (
        <Table
            tableHeaderData = { tableHeaderData }
            tableBodyData = { tableBodyData }
        />
        // <Box sx={{ height: 400, width: '100%' }}>
        //     <DataGrid
        //         getRowId={(row) => row.id}
        //         rows={tableBodyData}
        //         columns={tableHeaderData}
        //         initialState={{
        //             pagination: {
        //                 paginationModel: {
        //                     pageSize: 5,
        //                 },
        //             },
        //         }}
        //         pageSizeOptions={[5]}
        //         checkboxSelection
        //         disableRowSelectionOnClick
        //     />
        // </Box>
    )
}

export default TableDisplay
