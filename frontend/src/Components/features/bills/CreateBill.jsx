import React from "react";
import PropTypes from "prop-types";

import { useBills } from "../../hooks/Invoices/useBills.tsx";
import { FormProvider } from "react-hook-form";

import TransferForm from "./TransferForm";
import Transfer from "./Transfer";

FormProvider.propTypes = {
  children: PropTypes.node,
};

const MemoizedCreateBillForm = React.memo(({ budgetAmount, handleSubmit }) => (
  <Transfer>
    <TransferForm handleSubmit={handleSubmit} budgetAmount={budgetAmount} />
  </Transfer>
));

function CreateBill({ onCloseModal }) {
  const { methods, handleSaveBill, remainingBudgetAmount } =
    useBills();
  
  const submit = (data) => {
    handleSaveBill(data);
    onCloseModal();
  }

  return (
    <FormProvider {...methods}>
      <MemoizedCreateBillForm
        budgetAmount={remainingBudgetAmount?.getRemainingBudgetAmount}
        handleSubmit={submit}
      />
    </FormProvider>
  );
}

export default CreateBill;
