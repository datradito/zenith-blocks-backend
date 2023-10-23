import { transformInvoices } from "../../../Utility/transformItems.js";
import { GET_ALL_INVOICES_BY_BUDGET } from "../../../ServerQueries/Invoices/Queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { GET_REMAINING_BUDGET_AMOUNT } from "../../../ServerQueries/Budget/Queries.js";
export const useGetAllInvoices = (budgetId) => {
  const [invoices, setInvoices] = useState([]);
  const budgetData = useQuery(
    GET_REMAINING_BUDGET_AMOUNT,
    {
      variables: { budgetid: budgetId },
      errorPolicy: "all",
    }
  );

  console.log(budgetData)

  const { isLoading, error, data } = useQuery(
    GET_ALL_INVOICES_BY_BUDGET,
    {variables: { budgetid: budgetId },
    errorPolicy: "all",
    onCompleted: () => {
      const transformedInvoices = transformInvoices(data.getInvoicesByBudget);
      setInvoices(transformedInvoices);
    },
    onError: (errors) => {
      toast.error(errors.message);
    },
  });

  return { isLoading, error, invoices };
};
