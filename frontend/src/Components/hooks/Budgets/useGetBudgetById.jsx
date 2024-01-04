import { useQuery } from '@apollo/client';
import { GET_BUDGET_BY_ID } from '../../../ServerQueries/Budget/Queries'; // Import your GraphQL query
import toast from 'react-hot-toast';

export const useGetBudgetById = (budgetId) => {
    let toastId;

    const { data, error, loading} = useQuery(GET_BUDGET_BY_ID, {
        variables: { id: budgetId },
        onError: (error) => {
            toast.error(error.message, { duration: 2000 });
        },
        onCompleted: () => {
            toast.dismiss(toastId); // Set loading to false once query is completed
        }
    });

    if (loading) {
        toastId = toast.loading("Loading budgets...");
    }

    return { budget: data?.getBudgetById, loading, error };
};

