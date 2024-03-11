import { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMatch } from "react-router-dom";
import { useSubmitBill } from "./useSubmitBill";
import { useGetRemainingBudgetAmount } from "../Budgets/useGetRemainingBudgetAmount";
import useBudgetStore from "../../../store/modules/budgets/index.ts";
import useProposalStore from "../../../store/modules/proposal/index.ts";
import useDashboardStore from "../../../store/modules/dashboard/index.ts";

interface Category {
  name: string;
  // Add other properties of category here
}

interface Proposal {
  id: string;
  title: string;
  status: string;
  amount: number | null;
  space: string;
}

interface Budget {
  id: string;
  amount: number;
  currency: string;
  remaining: number;
  category: string;
}

interface FormValues {
  category: Category;
  currency: string;
  proposal: string;
  amount: number;
  date: Date;
  dueDate: Date;
  description: string;
  invoiceNumber: string;
}

export function useBills() {
  const { handleBillSubmit } = useSubmitBill();
  const match = useMatch("/bills/misc");
  const categories: Category[] = useDashboardStore((state) => state.categories);

  const currentProposal: Proposal | null = useProposalStore(
    (state) => state.currentProposal
  );
  const currentBudget: Budget | null = useBudgetStore(
    (state) => state.currentBudget
  );

  const { data: remainingBudgetAmount } = useGetRemainingBudgetAmount(
    currentBudget?.id
  );

  const methods = useForm({
    defaultValues: useMemo(() => {
      const defaultCategory = !match
        ? currentBudget?.category
        : categories[0].name;
      const defaultCurrency = !match ? currentBudget?.currency : "";
      const defaultProposal = currentProposal?.title ?? "";
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

//   const handleSaveBill = useCallback(
//     async (data: FormValues) => {
//       if (currentBudget && currentProposal) {
//         handleBillSubmit(data, currentBudget, currentProposal);
//         methods.reset();
//       }
//     },
//     [handleBillSubmit, currentBudget, currentProposal, methods]
    //   );
    
    const handleSaveBill = useCallback(
      async (data: FormValues) => {
          try {
            // Trigger sign transaction
            //const transactionResult = await triggerSignTransaction();

            // If user signs the transaction, submit bills data to backend
            if (false) {
              await handleBillSubmit(data);
              methods.reset();
            } else {
              // If user rejects the signing, ask if bill should be saved for later
              const saveForLater = window.confirm(
                "Do you want to save the bill for later?"
              );

              // If yes, send bill to backend
              if (saveForLater) {
                // await saveBillForLater(data);
              } else {
                // If no, cancel and redirect user back to home page
                // history.push("/home");
              }
            }
          } catch (error) {
            console.error("Error while saving bill:", error);
          }
      },
      [handleBillSubmit, currentBudget, currentProposal, methods]
    );

  return { methods, handleSaveBill, remainingBudgetAmount };
}
