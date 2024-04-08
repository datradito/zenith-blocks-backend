import { useMutation } from "@apollo/client";
import { SUBMIT_INVOICE_MUTATION } from "../../../model/invoices/mutation.js";
import { useParams, useMatch } from "react-router-dom";
import { message } from "antd";

import { billService } from "../../../Services/BillServices/BillService.js";
import { useGetBills } from "./useGetBills.jsx";
import useSafeStore from "../../../store/modules/safe/index.ts";
import useAuthStore from "../../../store/modules/auth/index.ts";
import useBillStore from "../../../store/modules/bills/index.ts";

export const useSubmitBill = () => {
  const match = useMatch("/misc/bills");
  const budgetId = useParams().budgetId;
  const { refetchBills } = useGetBills();
  const { safeSelected } = useSafeStore();
  const { billFilter } = useBillStore();
  const { user } = useAuthStore();

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
    },
  });

  if (loading) {
    message.loading({
      content: "🏗 Submitting bill...",
      key: "submitBill",
    });
  }
  const handleBillSubmit = async (data, transactionHash) => {
    const dataToBeSubmitted = await billService.sanitizeBillData(
      data,
      match ? "" : budgetId
    );

    if (!transactionHash) {
      const saveForLater = window.confirm(
        `Are you sure you want to submit this bill without associating it with a transaction? The bill will not be paid until a transaction is submitted.`
      );

      if (!saveForLater) {
        message.info({
          content: "Bill submission Canceled",
          key: "submitBillCanceled",
        });
        return;
      }
    }

    dataToBeSubmitted.transactionHash = transactionHash || null;
    dataToBeSubmitted.safeaddress = safeSelected;
    dataToBeSubmitted.daoid = user.daoId;
    try {
      await createBill({
        variables: {
          invoice: dataToBeSubmitted,
        },
      });
    } catch (err) {
      message.error({
        content: `❌ ${err.message}`,
        key: "submitBillError",
      });
      throw err;
    } finally {
      await refetchBills(billFilter);
    }
  };

  return { loading, handleBillSubmit };
};
