import { useParams } from 'react-router-dom';
import { SUBMIT_BUDGET_MUTATION } from '../../../ServerQueries/Budget/Mutation';
import { client, queryClient } from '../../../apolloConfig/client';
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';


const useSubmitBudget = () => {
    const proposalId = useParams().proposalId;
    const navigate = useNavigate();

    console.log(proposalId);

    const { mutate: submitBudget, isLoading: isSubmitting } = useMutation({
        mutationFn: async (budgetData) => {
            await client.mutate({
              mutation: SUBMIT_BUDGET_MUTATION,
              variables: {
                budget: {
                  category: budgetData.category,
                  amount: budgetData.amount,
                  currency: budgetData.currency,
                  breakdown: budgetData.breakdown,
                  proposalid: proposalId,
                  rootpath: budgetData.rootpath,
                },
              },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["budgets", proposalId],
            });
            toast.success("Budget created successfully");
            navigate(`/proposals/${proposalId}`);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isSubmitting, submitBudget };
};

export default useSubmitBudget;
