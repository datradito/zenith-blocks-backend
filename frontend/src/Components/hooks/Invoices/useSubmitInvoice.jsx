import { useMutation } from "@apollo/client";
import { SUBMIT_INVOICE_MUTATION } from "../../../ServerQueries/Invoices/Mutations.js";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

export const useSubmitInvoice = () => {
  const budgetId = useParams().budgetId;
  const navigate = useNavigate();
  

  const [createInvoice, { loading }] = useMutation(SUBMIT_INVOICE_MUTATION, {
    onError: (error) => {
      message.destroy("submitInvoice");
      message.error({
        content: `❌ ${error.message}`,
        key: "submitInvoiceError",
      });
    },
    onCompleted: () => {
      message.destroy("submitInvoice");
      message.success({
        content: "Invoice submitted successfully",
        key: "submitInvoiceSuccess",
      });
      navigate(`/budgets/${budgetId}/invoices`);
    },
    refetchQueries: [
      "getInvoicesByBudget",
      {
        variables: { budgetid: budgetId },
      },
    ],
  });

  if (loading) {
    message.loading({
      content: "🏗 Submitting invoice...",
      key: "submitInvoice",
    });
  }

  return { loading, createInvoice };
};






