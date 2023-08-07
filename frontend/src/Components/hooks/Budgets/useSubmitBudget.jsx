import { SUBMIT_BUDGET_MUTATION } from '../../../ServerQueries/Budget/Mutation';
import { useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useSelector } from 'react-redux';


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
            
            console.log("comes here")
           
            try {
                const { data } = await submitBudgetMutation({
                    variables: budget,
                });
                return data.submitBudget;
            } catch (error) {
                console.error('Budget submission failed:', error.message);
                throw error;
            }
        },
        [submitBudgetMutation]
    );

    // Cache the submitBudget function using useMemo to avoid recreating it on each render
    const cachedSubmitBudget = useMemo(() => submitBudget, [submitBudget]);

    return {
        submitBudget,
        loading,
        error,
    };
};

export default useSubmitBudget;
