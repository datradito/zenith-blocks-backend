import * as React from 'react';
import Chip from '@mui/material/Chip';
import { useDispatch } from 'react-redux';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import {  Link } from 'react-router-dom';
import { setBudget } from '../../../actions/currentBudgetAction';

export default function CustomInvoiceViewIcon({budgetId}) {
    const dispatch = useDispatch();
    const invoiceIconStyles = {
        chipStyle: {
            padding: '0 .25rem',
            color: 'white',
            backgroundColor: '#242b33',
            fontSize: '0.75rem',
            '& .MuiSvgIcon-root': {
                color: '#1A65C0',
                fontSize: '0.75rem',
            },
        }
    }
    const handleClick = () => {
        //get budget info from db based on id and dispatch id,amount,description, and category to redux store instead of just id
        dispatch(setBudget(budgetId));
    };

    return (
            <Link to={`/budgets/${budgetId}/invoices`}>
                <Chip icon={<DescriptionRoundedIcon />}
                    label="INVOICE"
                    onClick={handleClick}
                    sx = {invoiceIconStyles.chipStyle}
                    />
            </Link>
    );
}
