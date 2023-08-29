import { SUBMIT_BUDGET_MUTATION } from '../../../ServerQueries/Budget/Mutation';
import { useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';


const useSubmitBudget = () => {
    const [submitBudgetMutation, { loading, error }] = useMutation(SUBMIT_BUDGET_MUTATION,
        {
            update(cache, { data: { submitBudget } }) {
                // cache.modify({
                //     fields: {
                //         getAllBudgetsForProposal(existingBudgets = []) {
                //             const newBudgetRef = cache.writeFragment({
                //                 data: submitBudget,
                //                 fragment: gql`
                //                     fragment NewBudget on Budget {
                //                         id
                //                         category
                //                         amount
                //                         currency
                //                     }
                //                 `,
                //             });
                //             return [...existingBudgets, newBudgetRef];
                //         },
                //     },
                // });
            },
            // refetchQueries: [
            //     getAllBudgetsForProposal,
            //     {
            //         variables: { proposalid: budget.proposalid },
            //     },
            // ],
        }
    );

    
    // Function to handle budget submission
    const submitBudget = useCallback(
        async (budget) => {
           
            try {
                const { data } = await submitBudgetMutation({
                    variables: {
                        budget: {
                            category: budget.category,
                            amount: budget.amount,
                            currency: budget.currency,
                            breakdown: budget.breakdown,
                            proposalid: budget.proposalid,
                            rootpath: budget.rootpath
                        }
                    }
                });
                return data.submitBudget;
            } catch (error) {
                throw error;
            }
        },
        [submitBudgetMutation]
    );

    // Cache the submitBudget function using useMemo to avoid recreating it on each render
    useMemo(() => submitBudget, [submitBudget]);

    return {
        submitBudget,
        loading,
        error,
    };
};

export default useSubmitBudget;
