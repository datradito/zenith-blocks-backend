import { transformInvoices } from "../../../Utility/transformItems.js";
import { GET_ALL_INVOICES_BY_BUDGET } from "../../../ServerQueries/Invoices/Queries";
import { client } from "../../../apolloConfig/client.js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useGetAllInvoices = (budgetId) => {
  const [invoices, setInvoices] = useState([]);
  const { isLoading, error, data } = useQuery(
    ["invoices", budgetId],
    async () => {
      const response = await client.query({
        query: GET_ALL_INVOICES_BY_BUDGET,
        variables: { budgetid: budgetId },
      });
      return response.data.getInvoicesByBudget;
    },
    {
      onSuccess: (responseData) => {
        const transformedData = transformInvoices(responseData || []);
        setInvoices(transformedData);
      },
    }
  );

  console.log("data", data);
  console.log("invoices", invoices);

  return { isLoading, error, invoices };
};
