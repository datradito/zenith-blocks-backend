import React, { useEffect, useState } from "react";
import SubHeader from "../../molecules/SubHeader/SubHeader";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import CircularIndeterminate from "../../atoms/Loader/loader";
import generateUUID from "../../../Utility/uniqueId";
import { invoiceService } from "../../../Services/InvoiceServices/invoiceService";
import { useSubmitInvoice } from "../../hooks/Invoices/useSubmitInvoice";
import CreateInvoiceForm from "../../features/invoices/CreateInvoiceForm";
import Label from "../../atoms/Label/Label";
import GoBack from "../../atoms/GoBack/GoBack";
import Container from "../../atoms/Container/Container";
import { Form } from "react-router-dom";


const handleDraft = () => {
  console.log("Save Draft");
};

function InvoiceCreation() {
  const [invoiceError, setInvoiceError] = useState(null);

  const [invoiceErrorKey, setInvoiceErrorKey] = useState(0);
  const [initialHeaderData, setInitialHeaderData] = useState(null);

  const { isCreating, createInvoice } = useSubmitInvoice();

  const { proposal, Budget, header } = useSelector((state) => ({
    proposal: state.currentProposal.proposal,
    Budget: state.currentBudget.Budget,
    header: state.createInvoice.header,
  }));

  useEffect(() => {
    const initialHeaderData = async () => {
      const data = await invoiceService.prepareInitialHeaderData(
        proposal,
        Budget
      );
      setInitialHeaderData(data);
    };
    initialHeaderData();
  }, []);


  const handleSaveInvoice = async (event) => {
    const validationResult = invoiceService.handleValidation(header);

    if (validationResult.hasError) {
      setInvoiceError(validationResult.errorMessage);
      setInvoiceErrorKey(generateUUID());
      return false;
    }

    if (validationResult.hasError === false) {
      try {
        const dataToBeSubmitted = await invoiceService.sanitizeInvoiceData(
          header,
          Budget,
          proposal
        );
        createInvoice(dataToBeSubmitted);
      } catch (errors) {
        if (errors.message) {
          setInvoiceError(`Error: ${errors.message}`);
        }
      }
    }
  };


  if (isCreating) return <CircularIndeterminate />;

  return (
    <>
      <SubHeader.Container>
        <SubHeader.List
          sx={{
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          <Label>Proposals | Budgets | Invoices | Create Invoice</Label>
          <GoBack>
            <Label>Invoices</Label>
          </GoBack>
        </SubHeader.List>
        <SubHeader.List>
          <SubHeader.ActionButton
            label="Save Draft"
            onClick={handleDraft}
            sx={{
              backgroundColor: "#282A2E",
            }}
          />
          <SubHeader.ActionButton
            onClick={handleSaveInvoice}
            label="Save Invoice"
          />
        </SubHeader.List>
      </SubHeader.Container>
      <Form onSubmit={handleSaveInvoice}>
        <Container>
          {initialHeaderData && (
            <CreateInvoiceForm
              invoice={initialHeaderData}
              errors={invoiceError ? invoiceError : null}
              key={invoiceErrorKey}
            />
          )}
        </Container>
      </Form>
    </>
  );
}

export default InvoiceCreation;
