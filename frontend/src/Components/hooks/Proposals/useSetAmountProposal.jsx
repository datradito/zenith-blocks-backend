import { useMutation } from "@apollo/client";
import { ADD_OR_UPDATE_PROPOSAL } from "../../../model/proposals/mutation.js";
import { message } from "antd";
import useAuthStore from "../../../store/modules/auth/index.ts";

const useSaveProposalDetails = () => {
  const { address } = useAuthStore((state) => state.user);

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

  const saveProposalDetails = async (amount, row, currency) => {
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
      },
    });
  };

  return {
    loading,
    error,
    saveProposalDetails,
  };
};

export default useSaveProposalDetails;
