import { useState, useEffect } from 'react';
import { useQuery, NetworkStatus } from '@apollo/client';
import { GET_PROPOSAL_BY_SPACE } from '../../SnapShot/Queries.js';
import { snapShotClient } from '../../SnapShot/client.js';

const useProposals = () => {
    const [stateQuery, setStateQuery] = useState({ first: 10, skip: 0 });
    const [skipQuery, setSkipQuery] = useState(false);
    const [syncedAt, setSyncedAt] = useState(new Date().toLocaleString());

    useEffect(() => {
        if (localStorage.getItem('currentPage') !== stateQuery.skip) {
            setStateQuery({ ...stateQuery, skip: parseInt(localStorage.getItem('currentPage')) * 10 });
            setSkipQuery(false);
        } else {
            setSkipQuery(true);
        }
    }, [skipQuery]);

    const handleSkipValueChange = () => {
        let currentPage = localStorage.getItem('currentPage');
        if (currentPage === '1') {
            setStateQuery({ ...stateQuery, skip: 0 });
        }
        setStateQuery({ ...stateQuery, skip: (parseInt(currentPage) - 1) * 10 });
    };

    const { loading, error, data, refetch, networkStatus } = useQuery(GET_PROPOSAL_BY_SPACE, {
        skip: skipQuery,
        variables: {
            first: parseInt(stateQuery.first),
            skip: parseInt(stateQuery.skip),
            name: 'balancer.eth',
        },
        notifyOnNetworkStatusChange: true,
        client: snapShotClient,
    });

    useEffect(() => {
        if (networkStatus === NetworkStatus.refetch) {
            console.log('Fetching proposals...');
        }
    }, [networkStatus]);

    const handleExportCSV = () => {
        console.log('Export CSV');
    };

    const handleSyncProposals = () => {
        refetch({
            first: parseInt(stateQuery.first),
            skip: parseInt(stateQuery.skip),
            name: 'balancer.eth',
        });
        setSyncedAt(new Date().toLocaleString());
    };

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
