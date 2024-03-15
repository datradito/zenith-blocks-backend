import { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMatch } from "react-router-dom";
import { useSubmitBill } from "./useSubmitBill";
import { useGetRemainingBudgetAmount } from "../Budgets/useGetRemainingBudgetAmount";
import useBudgetStore from "../../../store/modules/budgets/index.ts";
import useProposalStore from "../../../store/modules/proposal/index.ts";
import useDashboardStore from "../../../store/modules/dashboard/index.ts";
import useAuthStore from "../../../store/modules/auth/index.ts";
import useSafeTransaction from "../Safe/useSafeTransaction.jsx";
import { transferFunds } from "../../../Services/Safe/transferFunds.ts";
export function useBillCreation() {
  const { handleBillSubmit } = useSubmitBill();
  const transactionService = useSafeTransaction();
  const {
    user: { address },
  } = useAuthStore();
  const match = useMatch("/bills/misc");

  const categories = useDashboardStore((state) => state.categories);
  const currentProposal = useProposalStore((state) => state.currentProposal);
  const currentBudget = useBudgetStore((state) => state.currentBudget);

  const { data: remainingBudgetAmount } = useGetRemainingBudgetAmount(
    currentBudget?.id
  );

  console.log(remainingBudgetAmount);

  const methods = useForm({
    defaultValues: useMemo(() => {
      const defaultCategory = !match
        ? currentBudget.category
        : categories[0].name;
      const defaultCurrency = !match ? currentBudget.currency : "";
      const defaultProposal = !match ? currentProposal.title : "";
      const defaultAmount = !match
        ? remainingBudgetAmount.getRemainingBudgetAmount
        : 0;
      const defaultDate = new Date().toISOString().split("T")[0];

      return {
        category: defaultCategory,
        currency: defaultCurrency,
        proposal: defaultProposal,
        amount: defaultAmount,
        date: defaultDate,
        dueDate: "",
        description: "",
        invoiceNumber: "",
      };
    }, [currentBudget, currentProposal, remainingBudgetAmount]),
  });

  const handleSaveBill = useCallback(
    async (data) => {
      try {
        const transactionSigned = await transferFunds(
          [
            data
          ],
          transactionService,
          address
        );

        console.log(transactionSigned);
        if (transactionSigned) {
          //Todo: save bill + payment in database , with signed hash
          //handleBillSubmit(data);
          //methods.reset();
        } else {
          // If user rejects the signing, ask if bill should be saved for later
          const saveForLater = window.confirm(
            "Do you want to save the bill for later?"
          );

          // If yes, send bill to backend
          if (saveForLater) {
            //Todo: save bill in backend without payment data
            console.log("save bill wit")
            // await saveBillForLater(data);
          } else {
            // If no, cancel and redirect user back to home page
            window.location.href = "/misc/bills";
          }
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    [handleBillSubmit, methods]
  );

  return { methods, handleSaveBill, remainingBudgetAmount };
}
