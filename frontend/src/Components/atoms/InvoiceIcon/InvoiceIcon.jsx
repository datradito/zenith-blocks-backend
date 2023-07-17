import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { useParams, Link } from 'react-router-dom';
import { setBudget, getBudget } from '../../../actions/currentBudgetAction';

export default function CustomInvoiceViewIcon({budgetId}) {
    const dispatch = useDispatch();
    const { proposalId } = useParams();
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
        dispatch(setBudget(budgetId));
    };

    return (
        <Stack direction="row" spacing={1}>
            <Link to={`/budgets/${budgetId}/invoices`}>
            {/* <Chip icon={<DescriptionRoundedIcon />} label="With Icon" /> */}
                <Chip icon={<DescriptionRoundedIcon />}
                    label="INVOICE"
                    onClick={handleClick}
                    sx = {invoiceIconStyles.chipStyle}
                    />
            </Link>
        </Stack>
    );
}
