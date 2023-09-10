import React from 'react'
import Table from "../molecules/Table/index"

function TableDisplay({ tableHeaderData, tableBodyData, dataToDisplay }) {
    
    return (
        <Table
            tableHeaderData = { tableHeaderData }
            tableBodyData = { tableBodyData }
        />
    )
}

export default TableDisplay
