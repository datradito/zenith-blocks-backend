import { useParams } from 'react-router-dom';
import { SUBMIT_BUDGET_MUTATION } from '../../../ServerQueries/Budget/Mutation';
import { useNavigate } from "react-router-dom";
import { useMutation, gql} from '@apollo/client';
import { toast } from "react-hot-toast";


export const useSubmitBudget = () => {
  const proposalId = useParams().proposalId;
  const navigate = useNavigate();

  const [submitBudgetMutation, { isSubmitting }] = useMutation(
    SUBMIT_BUDGET_MUTATION,
    {
      errorPolicy: "all",
      onError: (errors) => {
        toast.error(errors.message);
      },
      onCompleted: () => {
        toast.success("Budget created successfully");
        navigate(`/proposals/${proposalId}/budgets`);
      },
      update: (cache, { data: { submitBudget } }) => {
        cache.modify({
          fields: {
            getBudgetsForProposal(existingBudgets=[]) {
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
        'getBudgetsForProposal',
        {
          variables: { proposalid: proposalId },
        }

      ],
    }
  );

  return { isSubmitting, submitBudgetMutation };
};
