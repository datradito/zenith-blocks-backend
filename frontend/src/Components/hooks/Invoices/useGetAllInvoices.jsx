import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { transformInvoices } from "../../../Utility/transformItems.js";
import { GET_ALL_INVOICES_BY_BUDGET } from "../../../ServerQueries/Invoices/Queries";

export const useGetAllInvoicesByBudget = (budgetId) => {
    const [invoices, setInvoices] = useState([]);
    const [queryError, setQueryError] = useState(null);
    const [isFetching, setIsFetching] = useState(false); // New state to handle manual fetching

    const { loading, error, data, refetch } = useQuery(GET_ALL_INVOICES_BY_BUDGET, {
        variables: { budgetid: budgetId },
        skip: !budgetId,
        onError: (error) => console.log("Error in fetching invoices", error),
        onCompleted: (data) => console.log("Data", data),
    });

    const getInvoices = async () => {
        setIsFetching(true);
        try {
            const { data } = await refetch();
            const transformedData = transformInvoices(data?.getInvoicesByBudget);
            setInvoices(transformedData);
            setQueryError(null);
        } catch (error) {
            setQueryError(error);
        }
        setIsFetching(false);
    };

    useEffect(() => {
        if (data) {
            const transformedData = transformInvoices(data?.getInvoicesByBudget);
            setInvoices(transformedData);
        }
    }, [data]);


    return { loading, invoices, queryError, isFetching, refetch };
};
