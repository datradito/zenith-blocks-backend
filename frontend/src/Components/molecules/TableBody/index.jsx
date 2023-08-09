import React from 'react'
import TableRow from "../../atoms/TableRow/index"
import {
    TableBody as TableBodyMUI,
} from '@mui/material';

const TableBody = ({ tableBodyData }) => {

    return (
        <TableBodyMUI sx={{ border: "none"}}>
                {
                    tableBodyData.map((item, index )=> {
                        return <TableRow
                            key={index}
                            tableBodyData={item} />
                    })
                }
        </TableBodyMUI>
    )
}

export default TableBody
