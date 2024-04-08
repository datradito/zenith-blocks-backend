import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { transformInvoices } from "../../../utils/transformItems.js";
import { GET_ALL_INVOICES } from "../../../model/invoices/query.js";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import useBillStore from "../../../store/modules/bills/index.ts";
import { message } from "antd";

export const useGetBills = () => {
  const [bills, setBills] = useState([]);
  const budget = useParams();
  const isMounted = useRef(null); // add this line
  const filter = useBillStore((state) => state.billFilter);

  useEffect(() => {
    isMounted.current = true; // set to true when the component mounts
    if (budget?.budgetId) {
      filter.budgetid = budget.budgetId;
    } else {
      filter.budgetid = null;
    }
    return () => {
      isMounted.current = false; // set to false when the component unmounts
    };
  }, [budget?.budgetId]);

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
      console.log(errors)
      message.error(errors.message);
    },
  });

  const refetchBills = async (newFilter) => {
    try {
      const { data } = await refetchQuery({ filter: newFilter });
      const transformedInvoices = transformInvoices(data.getInvoices);
      setBills(transformedInvoices);
    } catch (error) {
      console.log(error)
      message.error(error.message);
    }
  };

  return { isLoading, error, bills, refetchBills };
};
