import { useQuery } from '@apollo/client';
import { GET_PROPOSAL_BY_ID } from '../../../SnapShot/Queries.js';
import { snapShotClient } from '../../../SnapShot/client.js';
import { useDispatch } from 'react-redux';
import { setProposal } from '../../../actions/currentProposal/index.js';
import { useEffect } from 'react';

export default function useProposalDetails(id) {
    const dispatch = useDispatch();
    const { loading, error, data  } = useQuery(GET_PROPOSAL_BY_ID, {
        variables: { id },
        pollInterval: 50000,
        client: snapShotClient,
    });

    useEffect(() => {
        if (!loading && !error && data && data.proposal) {
            dispatch(setProposal(data.proposal));
        }
    }, [loading, error, data, dispatch]);

    return { loading, error, data };
}
