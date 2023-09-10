import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useError } from './ErrorRouterProvider';

const ProposalRoute = ({ children }) => {
    const { handleError } = useError();
    const [showSnackbar, setShowSnackbar] = useState(false);
    let { proposal } = useSelector(state => state.currentProposal);

    useEffect(() => {
        if (proposal === null) {
            setShowSnackbar(true);
            handleError({ error: 'error', message: 'Please select a proposal' });
        } else {
            setShowSnackbar(false);
        }
    }, [handleError, proposal]);

    return !showSnackbar ? <Outlet /> : (
        handleError({ error: 'error', message: 'Please select a proposal and budget' })
    );
};

export default ProposalRoute;
