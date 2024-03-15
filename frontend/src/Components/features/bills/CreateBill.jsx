import React from "react";

import { useBills } from "../../hooks/Invoices/useBills.tsx";
import { FormProvider } from "react-hook-form";

import BillForm from "./BillForm";

const CreateBill = ({ onCloseModal }) => {
  const {
    methods,
    handleSaveBill,
    remainingBudgetAmount,
    categories,
    contacts,
    currencies,
  } = useBills();
  const submit = (data) => {
    handleSaveBill(data);
    onCloseModal();
  };

  return (
    <FormProvider {...methods}>
      <BillForm
        budgetAmount={remainingBudgetAmount?.getRemainingBudgetAmount}
        handleSubmit={submit}
        formData={{ categories, contacts, currencies }}
      />
    </FormProvider>
  );
};

export default CreateBill;
