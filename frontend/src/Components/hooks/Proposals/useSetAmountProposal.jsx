import { toast } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { ADD_OR_UPDATE_PROPOSAL } from "../../../ServerQueries/proposalMutation"; // Import the ADD_OR_UPDATE_PROPOSAL mutation
import { useAccount } from "wagmi";

const useSaveProposalDetails = () => {
  const { address } = useAccount();
  const [SetProposalAmount, { loading, error }] = useMutation(
    ADD_OR_UPDATE_PROPOSAL
  );

  const saveProposalDetails = async (amount, row) => {
    try {
      await SetProposalAmount({
        variables: {
          proposalAmountInput: {
            id: row.id,
            amount: parseInt(amount),
            modifier: address,
            rootpath: row.id,
            daoid: row.space.id,
          },
        },
      });
      toast.success(`Proposal Amount Saved`);
    } catch (error) {
      toast.error(`Failed to Save Proposal Amount: ${error.message}`);
    }
  };

  return {
    loading,
    error,
    saveProposalDetails,
  };
};

export default useSaveProposalDetails;
