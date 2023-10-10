import React from "react";
import SubHeader from "../../molecules/SubHeader/SubHeader";
import { useSelector } from "react-redux";
import CircularIndeterminate from "../../atoms/Loader/loader";
import { invoiceService } from "../../../Services/InvoiceServices/invoiceService";
import { useSubmitInvoice } from "../../hooks/Invoices/useSubmitInvoice";
import CreateInvoiceForm from "../../features/invoices/CreateInvoiceForm";
import Label from "../../atoms/Label/Label";
import GoBack from "../../atoms/GoBack/GoBack";
import Container from "../../atoms/Container/Container";

import { FormProvider, useForm } from "react-hook-form";
import Breadcrumbs from "../../atoms/BreadCrumbs/BreadCrumbs";



function InvoiceCreation() {
  const { isCreating, createInvoice } = useSubmitInvoice();

  const { proposal, Budget } = useSelector((state) => ({
    proposal: state.currentProposal.proposal,
    Budget: state.currentBudget.Budget,
  }));


  const methods = useForm({
    defaultValues: {
      Category: Budget.category,
      Proposal: proposal.title,
    },
  });


  const handleSaveInvoice = async (data) => {
        const dataToBeSubmitted = await invoiceService.sanitizeInvoiceData(
          data,
          Budget,
          proposal
        );
        createInvoice(dataToBeSubmitted);
  };


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
          <Label><Breadcrumbs id={Budget.id} /></Label>
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
            onClick={() => methods.handleSubmit(handleSaveInvoice)()}
            label="Save Invoice"
          />
        </SubHeader.List>
      </SubHeader.Container>
        <Container>
          <CreateInvoiceForm />
        </Container>
    </FormProvider>
  );
}

export default InvoiceCreation;
