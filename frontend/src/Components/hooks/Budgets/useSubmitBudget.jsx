import { useParams } from "react-router-dom";
import { SUBMIT_BUDGET_MUTATION } from "../../../model/budget/mutation";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { message } from "antd";


export const useSubmitBudget = () => {
  const proposalId = useParams().proposalId;
  const navigate = useNavigate();

  const [submitBudgetMutation, { loading }] = useMutation(
    SUBMIT_BUDGET_MUTATION,
    {
      errorPolicy: "all",
      onError: (error) => {
        message.destroy("submitBudget");
        message.error({
          content: `❌ ${error.message}`,
          key: "submitBudgetError",
        });
      },
      onCompleted: (data) => {
        message.destroy("submitBudget");
        message.success({
          content: "Budget submitted successfully",
          key: "submitBudgetSuccess",
        });
        navigate(`/proposals/${proposalId}/budgets`);
      },
      update: (cache, { data: { submitBudget } }) => {
        cache.modify({
          fields: {
            getBudgetsForProposal(existingBudgets = []) {
              const newBudgetRef = cache.writeFragment({
                data: submitBudget,
                fragment: gql`
                  fragment NewBudget on Budget {
                    id
                    category
                    amount
                    currency
                    breakdown
                    remaining
                    proposalid
                  }
                `,
              });
              return [...existingBudgets, newBudgetRef];
            },
          },
        });
      },
      refetchQueries: [
        "getBudgetsForProposal",
        {
          variables: { proposalid: proposalId },
        },
      ],
    }
  );

  if (loading) {
    message.loading({
      content: "Submitting budget... 🏗 ",
      key: "submitBudget",
    });
  }

  return { loading, submitBudgetMutation };
};
