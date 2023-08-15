import { useState, useMemo } from 'react';
import { useQuery, NetworkStatus } from '@apollo/client';
import { GET_PROPOSAL_BY_SPACE } from '../../SnapShot/Queries.js';
import { snapShotClient } from '../../SnapShot/client.js';


const useProposalQuery = (stateQuery) => {
    const dao = sessionStorage.getItem('daoId');
    
    return useQuery(GET_PROPOSAL_BY_SPACE, {
        variables: {
            first: parseInt(stateQuery.first),
            skip: parseInt(stateQuery.skip),
            name: dao,
        },
        notifyOnNetworkStatusChange: true,
        client: snapShotClient,
    });
};


const useProposals = () => {
    const [stateQuery, setStateQuery] = useState({
        first: 10,
        skip: parseInt(localStorage.getItem('currentPage')) * 10 || 0,
    });

    let syncedAt;
    // Refactor to useMemo to memoize the result of useQuery
    const { loading, error, data, refetch, networkStatus } = useProposalQuery(stateQuery);

    const handleSkipValueChange = () => {
        setStateQuery((prevState) => {
            const currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
            return {
                ...prevState,
                skip: (currentPage - 1) * 10,
            };
        });
    };

    const handleExportCSV = () => {
        console.log('Export CSV');
    };

    const handleSyncProposals = () => {
        refetch({
            first: parseInt(stateQuery.first),
            skip: parseInt(stateQuery.skip),
            name: 'balancer.eth',
        });
        syncedAt = new Date().toLocaleString(); // Fix: Define setSyncedAt or remove this line if not used
    };

    syncedAt = new Date().toLocaleString(); // Fix: Define syncedAt or remove this line if not used

    return {
        loading,
        error,
        data,
        syncedAt, 
        handleExportCSV,
        handleSyncProposals,
        handleSkipValueChange,
        networkStatus,
    };

};

export default useProposals;
