import { transformInvoices } from "../../../utils/transformItems.js";
import { GET_ALL_INVOICES_BY_BUDGET } from "../../../model/invoices/query";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useGetInvoices = (budgetId, status) => {
  const [invoices, setInvoices] = useState([]);

  const {
    isLoading,
    error,
    refetch: refetchQuery,
  } = useQuery(GET_ALL_INVOICES_BY_BUDGET, {
    variables: { budgetid: budgetId, where: { status: status } },
    errorPolicy: "all",
    onCompleted: (data) => {
      const transformedInvoices = transformInvoices(data.getInvoicesByBudget);
      setInvoices(transformedInvoices);
    },
    onError: (errors) => {
      toast.error(errors.message);
    },
  });

  const refetchInvoices = async (newStatus) => {
    try {
      const { data } = await refetchQuery({
        budgetid: budgetId,
        where: { status: newStatus },
      });
      const transformedInvoices = transformInvoices(data.getInvoicesByBudget);
      setInvoices(transformedInvoices);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { isLoading, error, invoices, refetchInvoices };
};

