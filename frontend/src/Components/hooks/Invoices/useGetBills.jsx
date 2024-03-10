import { useEffect, useRef } from "react";
import { transformInvoices } from "../../../utils/transformItems.js";
import { GET_ALL_INVOICES } from "../../../model/invoices/query.js";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useGetBills = (filter = {}) => {
  const [bills, setBills] = useState([]);
  const isMounted = useRef(null); // add this line

  useEffect(() => {
    isMounted.current = true; // set to true when the component mounts
    return () => {
      isMounted.current = false; // set to false when the component unmounts
    };
  }, []);

  const {
    isLoading,
    error,
    refetch: refetchQuery,
  } = useQuery(GET_ALL_INVOICES, {
    variables: { filter },
    errorPolicy: "all",
    onCompleted: (data) => {
      if (isMounted.current) {
        const transformedInvoices = transformInvoices(data.getInvoices);
        setBills(transformedInvoices);
      }
    },
    onError: (errors) => {
      toast.error(errors.message);
    },
  });

  const refetchBills = async (newFilter) => {
    try {
      const { data } = await refetchQuery({ filter: newFilter });
      const transformedInvoices = transformInvoices(data.getInvoicesByBudget);
      setBills(transformedInvoices);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { isLoading, error, bills, refetchBills };
};
