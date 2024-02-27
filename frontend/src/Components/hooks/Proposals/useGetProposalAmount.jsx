import { useQuery } from '@apollo/client';
import { GET_PROPOSAL_DETAILS } from '../../../ServerQueries/proposalQuery'; // Import the GET_PROPOSAL_Details query
import { useEffect } from 'react';
import { toast } from "react-hot-toast";

const useGetProposalAmount = (proposalid) => {

    const { loading: proposalLoading, error: proposalError, data: proposalAmountData, refetch } = useQuery(GET_PROPOSAL_DETAILS, {
        variables: { proposalid }
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
    const status = proposalAmountData?.getProposalDetailsById?.status || null;
    const currency = proposalAmountData?.getProposalDetailsById?.currency || null;
    return {
        amount,
        status,
        currency,
        proposalLoading,
        proposalid,
        refetch
    };
};

export default useGetProposalAmount;
