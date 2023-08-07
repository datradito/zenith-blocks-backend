import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAmount } from '../../../actions/currentProposal/amount.js';
import useGetProposalDetails from '../../hooks/useProposalDetails.jsx';
import useGetProposalAmount from '../../hooks/useGetProposalAmount.jsx';
import CustomActionIcon from "../../atoms/ActionIcon/CustomActionIcon.jsx";
import Box from '@mui/material/Box';
import CircularIndeterminate from '../../atoms/Loader/loader.jsx';


const Amount = ({ proposalid, onClick }) => {
    const dispatch = useDispatch();

    const { amount, proposalLoading, proposalError } = useGetProposalAmount(proposalid);

    // dispatch(addAmount({ amount: amount, proposalId: proposalId }));

    if (amount) {
        dispatch(addAmount({ amount: amount, proposalId: proposalid }));
    }

    if (proposalLoading) return (<Box sx={{ maxWidth: '50px', textAlign: 'left', maxHeight: '40px', marginTop: -2 }}><CircularIndeterminate /></Box>);

    return (
        <div>
            {amount !== null ? amount : <CustomActionIcon onClick={onClick} />}
        </div>
    )
}

export default Amount;