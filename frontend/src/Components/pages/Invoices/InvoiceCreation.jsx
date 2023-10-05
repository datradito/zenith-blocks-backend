import React, { useEffect, useState } from "react";
import SubHeader from "../../molecules/SubHeader/SubHeader";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import CircularIndeterminate from "../../atoms/Loader/loader";
import generateUUID from "../../../Utility/uniqueId";
import { invoiceService } from "../../../Services/InvoiceServices/invoiceService";
import { useSubmitInvoice } from "../../hooks/Invoices/useSubmitInvoice";
import CreateInvoiceForm from "../../features/invoices/CreateInvoiceForm";

const BoxStyle = {
  width: "90%",
  margin: "0rem auto",
  textAlign: "center",
  color: "white",
  border: ".05rem #2c2c2c solid",
  marginTop: "1rem",
  borderRadius: 3,
};

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

  const currentPathConfig = {
    path: "Invoices",
    to: `/proposal/${proposal.id}/invoices`,
  };

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

  const componentButtonConfig = [
    {
      label: "Save Draft",
      variant: "contained",
      onClick: handleDraft,
      innerText: "Save Draft",
      backgroundColor: "#282A2E",
      type: "link",
      to: "/proposal/budgets/export-csv",
    },
    {
      label: "Save Invoice",
      variant: "contained",
      onClick: handleSaveInvoice,
      innerText: "Save Invoice",
      ml: "0.5rem",
      type: "Submit",
      redirectTo: `/proposal/${proposal.id}/invoices`,
    },
  ];

  if (isCreating) return <CircularIndeterminate />;

  return (
    <>
      <SubHeader
        buttonConfig={componentButtonConfig}
        currentPath={currentPathConfig}
        previousPath="Proposals  Proposal  Budget"
      />
      <form onSubmit={handleSaveInvoice}>
        <Box sx={BoxStyle}>
          {initialHeaderData && (
            <CreateInvoiceForm
              invoice={initialHeaderData}
              errors={invoiceError ? invoiceError : null}
              key={invoiceErrorKey}
            />
          )}
        </Box>
      </form>
    </>
  );
}

export default InvoiceCreation;
