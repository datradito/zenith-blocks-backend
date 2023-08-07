import React from 'react'
import Table from "../molecules/Table/index"

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
