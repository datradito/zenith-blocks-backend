import { transformInvoices } from "../../../Utility/transformItems.js";
import { GET_ALL_INVOICES_BY_BUDGET } from "../../../ServerQueries/Invoices/Queries";
import { client } from "../../../apolloConfig/client.js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
export const useGetAllInvoices = (budgetId) => {
  const [invoices, setInvoices] = useState([]);

  const { isLoading, error, data } = useQuery(
    ["invoicesList", { budgetId }],
    async () => {
      const response = await client.query({
        query: GET_ALL_INVOICES_BY_BUDGET,
        variables: { budgetid: budgetId },
      });
      return response.data.getInvoicesByBudget;
    }
  );

  useEffect(() => {
    if (data) {
      const transformedInvoices = transformInvoices(data);
      setInvoices(transformedInvoices);
    }
  },[data]);
  
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  },[error]);



  return { isLoading, error, invoices };
};
