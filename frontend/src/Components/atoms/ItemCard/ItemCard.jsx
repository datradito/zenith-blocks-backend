import React from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import useStyles from './ItemCard.style';

function ItemCard({ label,value }) {
    const classes = useStyles();
    
    const ColumnItem = styled(Paper)(({ theme }) => ({
        backgroundColor: '#1A1C1E',
        textAlign: 'left',
        color: 'white',
        boxShadow: 'none',
        fontSize: '.85rem'
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
        <SubItem key={label} className={`${classes.subItemStyle}`}>
                <ColumnItem className={`${classes.label}`}>{label}</ColumnItem>
                <ColumnItem>{value}</ColumnItem>
        </SubItem>
  )
}

export default ItemCard