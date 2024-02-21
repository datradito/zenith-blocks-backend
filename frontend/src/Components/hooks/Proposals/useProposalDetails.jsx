import { useQuery } from '@apollo/client';
import { GET_PROPOSAL_BY_ID } from '../../../SnapShot/Queries.js';
import { snapShotClient } from '../../../apolloConfig/client.js';
import { useDispatch } from 'react-redux';
import { setProposal } from '../../../actions/currentProposal/index.js';
import { message } from 'antd';

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

    if(error) message.error("Error fetching proposal details");

    return { loading, data };
}

