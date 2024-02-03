// useInvoiceCreation.js
import { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSubmitInvoice } from "./useSubmitInvoice";
import { useGetRemainingBudgetAmount } from "../Budgets/useGetRemainingBudgetAmount";
import { useSelector } from "react-redux";
import { useGetBudgetById } from "../Budgets/useGetBudgetById";

export function useInvoiceCreation() {
  const { handleInvoiceSubmit } = useSubmitInvoice();
  const { proposal, Budget } = useSelector((state) => ({
    proposal: state.currentProposal.proposal,
    Budget: state.currentBudget.Budget,
  }));
  const { budget } = useGetBudgetById(Budget?.id);

  const { data: remainingBudgetAmount } = useGetRemainingBudgetAmount(
    Budget.id
  );

  const methods = useForm({
    defaultValues: useMemo(() => {
      const defaultCategory = budget ? budget.category : "";
      const defaultCurrency = budget ? budget.currency : "";
      const defaultProposal = proposal ? proposal.title : "";
      const defaultAmount = remainingBudgetAmount ? remainingBudgetAmount : 0;

      return {
        Category: defaultCategory,
        Currency: defaultCurrency,
        Proposal: defaultProposal,
        Amount: defaultAmount,
      };
    }, [budget, proposal, remainingBudgetAmount]),
  });

  const handleSaveInvoice = useCallback(
    async (data) => {
      handleInvoiceSubmit(data, Budget, proposal);
      methods.reset();
    },
    [handleInvoiceSubmit, Budget, proposal, methods]
  );

  return { methods, Budget, handleSaveInvoice, remainingBudgetAmount };
}
