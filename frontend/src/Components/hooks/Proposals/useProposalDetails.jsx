import { useQuery } from '@apollo/client';
import { GET_PROPOSAL_BY_ID } from '../../../SnapShot/Queries.js';
import { snapShotClient } from '../../../apolloConfig/client.js';
import { toast } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { setProposal } from '../../../actions/currentProposal/index.js';

export default function useProposalDetails(id) {

    const { loading, error, data  } = useQuery(GET_PROPOSAL_BY_ID, {
        variables: { id },
        pollInterval: 50000,
        client: snapShotClient,
    });

    const dispatch = useDispatch();

    if (data) {
        dispatch(setProposal(data.proposal));
    }

    if(error) toast.error(error.message);

    return { loading, data };
}

