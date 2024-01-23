import { useMutation } from "@apollo/client";
import { ADD_OR_UPDATE_PROPOSAL } from "../../../ServerQueries/proposalMutation"; // Import the ADD_OR_UPDATE_PROPOSAL mutation
import { useAccount } from "wagmi";
import { message } from "antd";

const useSaveProposalDetails = () => {
  const { address } = useAccount();
  const [SetProposalAmount, { loading, error }] = useMutation(
    ADD_OR_UPDATE_PROPOSAL,
    {
      errorPolicy: "all",
      onError: (error) => {
        message.error({
          content: `❌ ${error.message}`,
          key: "submitBudgetError",
        });
      },
      onCompleted: () => {
        message.success({
          content: "Proposal Amount Saved Successfully",
          key: "submitBudgetSuccess",
        });
      },
    }
  );

  const saveProposalDetails = async (amount, row,currency) => {
      await SetProposalAmount({
        variables: {
          proposalAmountInput: {
            id: row.id,
            amount: parseInt(amount),
            modifier: address,
            rootpath: row.id,
            daoid: row.space.id,
            currency: currency,
          },
        }
      });
  };

  return {
    loading,
    error,
    saveProposalDetails,
  };
};

export default useSaveProposalDetails;
