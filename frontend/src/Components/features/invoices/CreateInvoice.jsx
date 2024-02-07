import React from "react";
import PropTypes from "prop-types";

import { useInvoiceCreation } from "../../hooks/Invoices/useInvoiceCreation";

import CreateInvoiceForm from "./CreateInvoiceForm";

import { FormProvider } from "react-hook-form";
import InvoiceSubHeader from "./InvoiceSubHeader";

CreateInvoiceForm.propTypes = {
  remainingBudgetAmount: PropTypes.number,
};

FormProvider.propTypes = {
  children: PropTypes.node,
};

const MemoizedCreateInvoiceForm = React.memo(({ remainingBudgetAmount }) => (
  <CreateInvoiceForm remainingBudgetAmount={remainingBudgetAmount} />
));

function InvoiceCreation() {
  const { methods, Budget, handleSaveInvoice, remainingBudgetAmount } =
    useInvoiceCreation();

  return (
    <FormProvider {...methods}>
      <InvoiceSubHeader
        transaction={Budget}
        methods={methods}
        handleSaveInvoice={handleSaveInvoice}
      />
      <MemoizedCreateInvoiceForm
        remainingBudgetAmount={remainingBudgetAmount?.getRemainingBudgetAmount}
      />
    </FormProvider>
  );
}

export default InvoiceCreation;
