import { useQuery } from '@apollo/client';
import { GET_PROPOSAL_DETAILS } from '../../../ServerQueries/proposalQuery'; // Import the GET_PROPOSAL_Details query
import { useEffect } from 'react';
import { toast } from "react-hot-toast";

const useGetProposalAmount = (proposalid) => {

    const { loading: proposalLoading, error: proposalError, data: proposalAmountData, refetch } = useQuery(GET_PROPOSAL_DETAILS, {
        variables: { proposalid },
        fetchPolicy: 'network-only',
    });


    useEffect(() => {
        refetch();
    }, [refetch]);

    if (proposalError) {
        toast.error("Failed to Load Proposal Details");
        return {
            proposalLoading: false,
            amount: null,
            status: null,
        };
    }

    const amount = proposalAmountData?.getProposalDetailsById?.amount || null;
    const status = proposalAmountData?.getProposalDetailsById?.status || null;  // Replace 'amount' with the actual field name from the query result

    return {
        amount,
        status,
        proposalLoading,
        proposalid,
    };
};

export default useGetProposalAmount;
