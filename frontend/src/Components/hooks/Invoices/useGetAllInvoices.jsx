import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { transformInvoices } from "../../../Utility/transformItems.js";
import { GET_ALL_INVOICES_BY_BUDGET } from "../../../ServerQueries/Invoices/Queries";

export const useGetAllInvoicesByBudget = (budgetId) => {
    const [budgetInvoices, setBudgetInvoices] = useState(); 
    // Memoize the query to ensure it's only executed when budgetId changes
    const memoizedQuery = useMemo(() => GET_ALL_INVOICES_BY_BUDGET, [budgetId]);

    // create method for calling the query so that i can use and call it from component
    const { loading, error, data } = useQuery(memoizedQuery, {
        variables: { budgetid: budgetId },
    });

    useEffect(() => {
        //add error nboundaries and set transformed data to invoice
        if (data) {
            setBudgetInvoices(transformInvoices(data?.getInvoicesByBudget));
        }
    }, [data]);

    

    // Return the loading, error, and data as needed
    return { loading, error, data, budgetInvoices };
};