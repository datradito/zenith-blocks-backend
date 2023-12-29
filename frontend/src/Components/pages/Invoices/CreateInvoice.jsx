import React, { useCallback, useMemo } from "react";
import SubHeader from "../../molecules/SubHeader/SubHeader";
import { useSelector } from "react-redux";
import CircularIndeterminate from "../../atoms/Loader/loader";

import { invoiceService } from "../../../Services/InvoiceServices/invoiceService";
import { useSubmitInvoice } from "../../hooks/Invoices/useSubmitInvoice";
import { useGetRemainingBudgetAmount } from "../../hooks/Budgets/useGetRemainingBudgetAmount";
import { useGetBudgetById } from "../../hooks/Budgets/useGetBudgetById"; // Import the useGetBudgetById hook

import CreateInvoiceForm from "../../features/invoices/CreateInvoiceForm";
import Label from "../../atoms/Label/Label";
import GoBack from "../../atoms/GoBack/GoBack";
import Container from "../../atoms/Container/Container";

import { FormProvider, useForm } from "react-hook-form";
import Breadcrumbs from "../../atoms/BreadCrumbs/BreadCrumbs";

function InvoiceCreation() {
  const { loading: isCreating, createInvoice } = useSubmitInvoice();

  const { proposal, Budget } = useSelector((state) => ({
    proposal: state.currentProposal.proposal,
    Budget: state.currentBudget.Budget,
  }));

  const { data: remainingBudgetAmount } = useGetRemainingBudgetAmount(Budget.id);

  // Use the useGetBudgetById hook to get category and currency values
  const { budget } = useGetBudgetById(Budget.id);

const methods = useForm({
  defaultValues: useMemo(() => {
    // Set default values in case budget is null or undefined
    const defaultCategory = budget ? budget.category : "";
    const defaultCurrency = budget ? budget.currency : "";
    const defaultProposal = proposal ? proposal.title : "";

    return {
      Category: defaultCategory,
      Currency: defaultCurrency,
      Proposal: defaultProposal,
    };
  }, [budget, proposal]),
});


  const handleSaveInvoice = useCallback(async (data) => {
    const dataToBeSubmitted = await invoiceService.sanitizeInvoiceData(data, Budget, proposal);
    createInvoice({
      variables: {
        invoice: dataToBeSubmitted,
      },
    });
  }, [Budget, createInvoice, proposal]);

  if (isCreating) return <CircularIndeterminate />;

  return (
    <FormProvider {...methods}>
      <SubHeader.Container>
        <SubHeader.List
          sx={{
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          <Label>
            <Breadcrumbs id={Budget.id} />
          </Label>
          <GoBack>
            <Label>Invoices</Label>
          </GoBack>
        </SubHeader.List>
        <SubHeader.List>
          <SubHeader.ActionButton
            label="Reset Invoice"
            onClick={() => methods.reset()}
            sx={{
              backgroundColor: "#FC4F4F",
            }}
          />
          <SubHeader.ActionButton
            onClick={methods.handleSubmit(handleSaveInvoice)}
            label="Save Invoice"
          />
        </SubHeader.List>
      </SubHeader.Container>
      <Container>
        <CreateInvoiceForm remainingBudgetAmount={remainingBudgetAmount?.getRemainingBudgetAmount} />
      </Container>
    </FormProvider>
  );
}

export default InvoiceCreation;
