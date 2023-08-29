import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { transformInvoices } from "../../../Utility/transformItems.js";
import { GET_ALL_INVOICES_BY_BUDGET } from "../../../ServerQueries/Invoices/Queries";
import { useSelector } from "react-redux";


export const useGetAllInvoicesByBudget = (budgetId) => {
    const { Budget } = useSelector(state => state.currentBudget);
    const [budgetInvoices, setBudgetInvoices] = useState();
    const [queryError, setQueryError] = useState(null);
    const memoizedQuery = useMemo(() => GET_ALL_INVOICES_BY_BUDGET, [budgetId]);

    const { loading, error, data, refetch } = useQuery(memoizedQuery, {
        variables: { budgetid: budgetId },
        skip: !budgetId,
    });

    const getInvoices = async () => {
        try {
            const { data } = await refetch();
            setBudgetInvoices(transformInvoices(data?.getInvoicesByBudget));
            setQueryError(null);
            return data;
        } catch (error) {
            setQueryError(error);
            return error;
        }
    };

    useEffect(() => {
        if (data) {
            setBudgetInvoices(transformInvoices(data?.getInvoicesByBudget));
        }
    }, [data]);

    return { loading, data, budgetInvoices, getInvoices, queryError };
};
