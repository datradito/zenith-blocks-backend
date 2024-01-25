import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import SubHeader from "../../molecules/SubHeader/SubHeader";
import { useSelector } from "react-redux";

import { invoiceService } from "../../../Services/InvoiceServices/invoiceService";
import { useSubmitInvoice } from "../../hooks/Invoices/useSubmitInvoice";
import { useGetRemainingBudgetAmount } from "../../hooks/Budgets/useGetRemainingBudgetAmount";
import { useGetBudgetById } from "../../hooks/Budgets/useGetBudgetById"; // Import the useGetBudgetById hook

import CreateInvoiceForm from "./CreateInvoiceForm";
import Label from "../../atoms/Label/Label";
import GoBack from "../../atoms/GoBack/GoBack";
import Container from "../../atoms/Container/Container";

import { FormProvider, useForm } from "react-hook-form";
import Breadcrumbs from "../../atoms/BreadCrumbs/BreadCrumbs"; 


CreateInvoiceForm.propTypes = {
  remainingBudgetAmount: PropTypes.number,
};

FormProvider.propTypes = {
  children: PropTypes.node,
};

function InvoiceCreation() {
  const { createInvoice } = useSubmitInvoice();

  const { proposal, Budget } = useSelector((state) => ({
    proposal: state.currentProposal.proposal,
    Budget: state.currentBudget.Budget,
  }));

  const { data: remainingBudgetAmount } = useGetRemainingBudgetAmount(
    Budget.id
  );

  const { budget } = useGetBudgetById(Budget.id);

  const methods = useForm({
    defaultValues: useMemo(() => {
      // Set default values in case budget is null or undefined
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
    }, [budget, proposal, remainingBudgetAmount]), // Added missing dependency
  });

  const handleSaveInvoice = useCallback(
    async (data) => {
      const dataToBeSubmitted = await invoiceService.sanitizeInvoiceData(
        data,
        Budget,
        proposal
      );
      createInvoice({
        variables: {
          invoice: dataToBeSubmitted,
        }
      });
      methods.reset();
    },
    [Budget, createInvoice, proposal, methods]
  );

  return (
    <FormProvider {...methods}>
      <SubHeader.Container>
        <SubHeader.List>
          <Label>
            <Breadcrumbs id={Budget.id} />
          </Label>
          <GoBack>
            <Label>Invoices</Label>
          </GoBack>
        </SubHeader.List>
        <SubHeader.List styles={{ flexDirection: "row", gap: "1rem" }}>
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
        <CreateInvoiceForm
          remainingBudgetAmount={
            remainingBudgetAmount?.getRemainingBudgetAmount
          }
        />
      </Container>
    </FormProvider>
  );
}

export default InvoiceCreation;
