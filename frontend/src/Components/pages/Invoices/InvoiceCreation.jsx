import React, { useEffect, useState } from "react";
import SubHeader from "../../molecules/SubHeader/SubHeader";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import FormItem from "../../atoms/FormItem/FormItem";
import { SUBMIT_INVOICE_MUTATION } from "../../../ServerQueries/Invoices/Mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../../atoms/Loader/loader";
import { resetInvoice } from "../../../actions/createInvoiceAction";
import CustomizedSnackbars from "../../atoms/SnackBar/SnackBar";
import generateUUID from "../../../Utility/uniqueId";
import { useGetAllInvoicesByBudget } from "../../hooks/Invoices/useGetAllInvoices";
import invoiceService from "../../../Services/InvoiceServices/invoiceService";

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
  const [successMessage, setSuccessMessage] = useState(null);
  const [invoiceErrorKey, setInvoiceErrorKey] = useState(0);
  const [initialHeaderData, setInitialHeaderData] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [submitInvoice, { loading, error }] = useMutation(
    SUBMIT_INVOICE_MUTATION
  );

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

  const { refetch } = useGetAllInvoicesByBudget(Budget?.id);

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
        await submitInvoice({
          variables: {
            invoice: await invoiceService.sanitizeInvoiceData(
              header,
              Budget,
              proposal
            ),
          },
        });

        setSuccessMessage("Invoice saved successfully!");
        dispatch(resetInvoice());
        navigate(`/proposal/${proposal.id}/invoices`);
        refetch();
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

  if (loading) return <CircularIndeterminate />;

  return (
    <>
      <SubHeader
        buttonConfig={componentButtonConfig}
        currentPath={currentPathConfig}
        previousPath="Proposals  Proposal  Budget"
      />
      <form onSubmit={handleSaveInvoice}>
        <Box sx={BoxStyle}>
          {
            initialHeaderData && (
              <FormItem
                initialValues={initialHeaderData}
                type="invoice"
                errors={invoiceError ? invoiceError : null}
                key={invoiceErrorKey}
              />
            )
          }
        </Box>
        {successMessage && (
          <CustomizedSnackbars
            key="success"
            message={successMessage}
            severity="success"
            autoOpen={true}
          />
        )}
      </form>
    </>
  );
}

export default InvoiceCreation;
