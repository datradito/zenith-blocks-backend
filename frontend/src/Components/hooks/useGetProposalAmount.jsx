import { useQuery } from '@apollo/client';
import { GET_PROPOSAL_DETAILS } from '../../ServerQueries/proposalQuery'; // Import the GET_PROPOSAL_Details query

const useGetProposalDetails =  ({ proposalId }) => {
    const { loading: proposalLoading, error: proposalError, data } = useQuery(GET_PROPOSAL_DETAILS, {
        variables: { proposalId },
    });

    // You can extract the proposal Details from the 'data' object based on your GraphQL query structure
    const amount = data?.getProposalAmountById.Amount || null; // Replace 'amount' with the actual field name from the query result

    return {
        amount,
        proposalLoading,
        proposalError,
    };
};

export default useGetProposalDetails;
