import { SUBMIT_INVOICE_MUTATION } from "../../../ServerQueries/Invoices/Mutations.js";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export const useSubmitInvoice = () => {
  const budgetId = useParams().budgetId;
  const navigate = useNavigate();

  const [createInvoice, { loading }] = useMutation(
    SUBMIT_INVOICE_MUTATION,
    {
      errorPolicy: "all",
      onError: (errors) => {
        toast.error(errors.message);
      },
      onCompleted: () => {
        toast.success("Invoice created successfully");
        navigate(`/budgets/${budgetId}/invoices`);
      },
    }
  );

  return { loading, createInvoice };
};


