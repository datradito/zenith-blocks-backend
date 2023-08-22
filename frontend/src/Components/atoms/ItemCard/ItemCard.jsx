import React from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


function ItemCard({ label,value }) {

    const componentStyles = {
        buttonStyle: {
            backgroundColor: "#035FFC",
            margin: "2rem",
        },
        label: {
            color: 'Grey',
            fontSize: '.65rem'
        },
        subItemStyle: {
            minWidth: 200,
            
        },
        minWidth: {
            minWidth: '200px',
            maxWidth: '200px',
        },
        defaultWidth: {
            minWidth: '700px'
        }
    }

    const ColumnItemLabel = styled(Paper)(({ theme }) => ({
       backgroundColor: "rgba(40, 42, 46, 0.2)",
        textAlign: 'left',
        color: 'grey',
        padding: '.5rem 0',
        boxShadow: 'none',
        fontSize: '.75rem'
    }));

    const ColumnItemValue = styled(Paper)(({ theme }) => ({
       backgroundColor: "rgba(40, 42, 46, 0.2)",
        textAlign: 'left',
        color: 'white',
        boxShadow: 'none',
        fontSize: '.95rem'
    }));

    const exclude = ["Invoice", "Date", "Due"]

    const SubItem = styled(Paper)(({ theme }) => ({
       backgroundColor: "rgba(40, 42, 46, 0.2)",
        padding: theme.spacing(1),
        margin: theme.spacing(.5),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        boxShadow: 'none',
    }));
    return (
        !exclude.includes(label) ?
            <SubItem key={label} sx={componentStyles.subItemStyle}>
                <ColumnItemLabel sx={`${label !== "Title" ? componentStyles.minWidth : componentStyles.defaultWidth}`}>{label}</ColumnItemLabel>
                <ColumnItemValue>{value}</ColumnItemValue>
        </SubItem> : null

  )
}

export default ItemCard