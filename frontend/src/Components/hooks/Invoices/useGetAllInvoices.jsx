import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { GET_ALL_INVOICES_BY_BUDGET } from "../../../ServerQueries/Invoices/Queries";

export const useGetAllInvoicesByBudget = (budgetId) => {
    // Memoize the query to ensure it's only executed when budgetId changes
    const memoizedQuery = useMemo(() => GET_ALL_INVOICES_BY_BUDGET, []);

    // Use the useQuery hook with the memoized query and variables
    const { loading, error, data } = useQuery(memoizedQuery, {
        variables: { budgetid: budgetId },
    });

    // Return the loading, error, and data as needed
    return { loading, error, data };
};