import { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMatch } from "react-router-dom";
import { useSubmitBill } from "./useSubmitBill";
import { useGetRemainingBudgetAmount } from "../Budgets/useGetRemainingBudgetAmount";
import useBudgetStore from "../../../store/modules/budgets/index.ts";
import useProposalStore from "../../../store/modules/proposal/index.ts";
import useDashboardStore from "../../../store/modules/dashboard/index.ts";

export function useBillCreation() {
  const { handleBillSubmit } = useSubmitBill();
  const match = useMatch('/bills/misc');
    const categories = useDashboardStore((state) => state.categories);

  const currentProposal = useProposalStore((state) => state.currentProposal);
  const currentBudget = useBudgetStore((state) => state.currentBudget);


  const { data: remainingBudgetAmount } = useGetRemainingBudgetAmount(
    currentBudget?.id
  );

  const methods = useForm({
    defaultValues: useMemo(() => {
      const defaultCategory =  !match ? currentBudget.category : categories[0].name ;
      const defaultCurrency = !match ? currentBudget.currency : "" ;
      const defaultProposal = !match ? currentProposal.title : "";
      const defaultAmount = 0;
      const defaultDate = new Date().toISOString().split('T')[0];

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
      handleBillSubmit(data, currentBudget, currentProposal);
      methods.reset();
    },
    [handleBillSubmit, currentBudget, currentProposal, methods]
  );

  return { methods, handleSaveBill, remainingBudgetAmount };
}
