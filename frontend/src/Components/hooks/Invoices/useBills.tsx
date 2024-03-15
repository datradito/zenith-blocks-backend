import { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMatch } from "react-router-dom";
import { useSubmitBill } from "./useSubmitBill";
import { useGetRemainingBudgetAmount } from "../Budgets/useGetRemainingBudgetAmount";
import useBudgetStore from "../../../store/modules/budgets/index.ts";
import useProposalStore from "../../../store/modules/proposal/index.ts";
import useDashboardStore from "../../../store/modules/dashboard/index.ts";
import useGetContacts from "../Contacts/useGetContacts.jsx";
import { getSafeDataForForms } from "../../../Services/Safe/getSafeDataForForms.js";

type Category =  {
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

type InputValues = {
  category: string;
  proposal: string;
  amount: number;
  date: string;
  dueDate: string;
  description: string;
  invoiceNumber: string;
};

export function useBills() {
  const match = useMatch("/bills/misc");
  const { handleBillSubmit } = useSubmitBill();

  const currentProposal: Proposal | null = useProposalStore(
    (state) => state.currentProposal
  );
  const currentBudget: Budget | null = useBudgetStore(
    (state) => state.currentBudget
  );

  const { data: remainingBudgetAmount } = useGetRemainingBudgetAmount(
    currentBudget?.id
  );

  const {categories, currencies, contacts} = getSafeDataForForms();

  const methods = useForm({
    defaultValues: {
      category: !match ? {name: currentBudget?.category} : categories[0],
      proposal: !match ? "" : currentProposal?.title,
      currency: currencies[0],
      recipient: contacts[0] || "Enter recipient",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      dueDate: "",
      description: "",
      invoiceNumber: "",
    },
  });

    const handleSaveBill = useCallback(
      async (data: FormValues) => {
        console.log("data", data);
        const dataForSafe = {

        }
          try {
            // Trigger sign transaction
            //const transactionResult = await triggerSignTransaction();
            console.log(data)
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

  return { methods, handleSaveBill, remainingBudgetAmount, currencies, categories, contacts};
}
