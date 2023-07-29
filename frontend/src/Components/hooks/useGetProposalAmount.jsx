import { useQuery } from '@apollo/client';
import { GET_PROPOSAL_DETAILS } from '../../ServerQueries/proposalQuery'; // Import the GET_PROPOSAL_Details query

const useGetProposalAmount = (proposalid) => {

    const { loading: proposalLoading, error: proposalError, data: proposalAmountData } = useQuery(GET_PROPOSAL_DETAILS, {
        variables: { proposalid },
    });

    if (proposalError) {
        console.log('error', proposalError);
    }
    // You can extract the proposal Details from the 'data' object based on your GraphQL query structure
    const amount = proposalAmountData?.getProposalAmountById?.amount || null; // Replace 'amount' with the actual field name from the query result

    return {
        amount,
        proposalLoading,
        proposalError,
        proposalid,
    };
};

export default useGetProposalAmount;
