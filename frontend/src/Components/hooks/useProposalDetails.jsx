// src/hooks/useProposal.js
import { useQuery } from '@apollo/client';
import { GET_PROPOSAL_BY_ID } from '../../SnapShot/Queries.js';
import { snapShotClient } from '../../SnapShot/client.js';

export default function useProposalDetails(id) {
    const { loading, error, data  } = useQuery(GET_PROPOSAL_BY_ID, {
        variables: { id },
        pollInterval: 50000,
        client: snapShotClient,
    });

    return { loading, error, data };
}
