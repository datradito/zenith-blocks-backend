import { useMutation } from "@apollo/client";
import { SUBMIT_INVOICE_MUTATION } from "../../../model/invoices/mutation.js";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

import { invoiceService } from "../../../Services/InvoiceServices/invoiceService.js";

export const useSubmitBill = () => {
  const budgetId = useParams().budgetId;
  const navigate = useNavigate();

  const [createBill, { loading }] = useMutation(SUBMIT_INVOICE_MUTATION, {
    onError: (error) => {
      message.destroy("submitBill");
      message.error({
        content: `❌ ${error.message}`,
        key: "submitBillError",
      });
    },
    onCompleted: () => {
      message.destroy("submitBill");
      message.success({
        content: "Bill submitted successfully",
        key: "submitBillSuccess",
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
      content: "🏗 Submitting bill...",
      key: "submitBill",
    });
  }

  const handleBillSubmit = async (data, Budget, proposal) => {
    console.log(data)
    // const dataToBeSubmitted = await invoiceService.sanitizeInvoiceData(
    //   data,
    //   Budget,
    //   proposal
    // );
    // createBill({
    //   variables: {
    //     invoice: dataToBeSubmitted,
    //   },
    // });
    message.info("🚧 This feature is under construction 🚧");
  };

  return { loading, createBill, handleBillSubmit };
};
