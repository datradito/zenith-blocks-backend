import React from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import useStyles from './ItemCard.style';

function ItemCard({ label,value }) {
    const classes = useStyles();
    
    const ColumnItemLabel = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A1C1E',
        textAlign: 'left',
        color: 'grey',
        padding: '.5rem 0',
        boxShadow: 'none',
        fontSize: '.75rem'
    }));

    const ColumnItemValue = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A1C1E',
        textAlign: 'left',
        color: 'white',
        boxShadow: 'none',
        fontSize: '.95rem'
    }));

    const SubItem = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A1C1E',
        padding: theme.spacing(1),
        margin: theme.spacing(.5),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        boxShadow: 'none',
    }));
    return (
        <SubItem key={label} className={classes.subItemStyle}>
                <ColumnItemLabel className={`${ label !== "Title" ? classes.minWidth: classes.defaultWidth}`}>{label}</ColumnItemLabel>
                <ColumnItemValue>{value}</ColumnItemValue>
        </SubItem>
  )
}

export default ItemCard