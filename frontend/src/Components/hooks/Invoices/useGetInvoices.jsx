import { transformInvoices } from "../../../Utility/transformItems.js";
import { GET_ALL_INVOICES_BY_BUDGET } from "../../../ServerQueries/Invoices/Queries";
import { client } from "../../../apolloConfig/client.js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useGetAllInvoices = (budgetId) => {
  const [invoices, setInvoices] = useState([]);
  const { isLoading, error, data, refetch } = useQuery(["invoices", budgetId], async () =>
    await client.query({
      query: GET_ALL_INVOICES_BY_BUDGET,
      variables: { budgetid: budgetId },
    }),
  );

  useEffect(() => {
    const transformedData = transformInvoices(data?.data.getInvoicesByBudget || []);
      setInvoices(transformedData);
  }, [data]);


  return { isLoading, error, invoices, refetch };
};
