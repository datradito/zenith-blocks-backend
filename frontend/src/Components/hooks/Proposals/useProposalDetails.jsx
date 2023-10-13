import { useQuery } from '@apollo/client';
import { GET_PROPOSAL_BY_ID } from '../../../SnapShot/Queries.js';
import { snapShotClient } from '../../../SnapShot/client.js';
import { toast } from 'react-toastify';

export default function useProposalDetails(id) {

    const { loading, error, data  } = useQuery(GET_PROPOSAL_BY_ID, {
        variables: { id },
        pollInterval: 50000,
        client: snapShotClient,
    });

    if(error) toast.error(error.message);

    return { loading, data };
}

