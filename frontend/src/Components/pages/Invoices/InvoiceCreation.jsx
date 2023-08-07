import React, { useState } from 'react'
import SubHeader from '../../molecules/SubHeader/SubHeader';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import FormItem from '../../atoms/FormItem/FormItem';
import { SUBMIT_INVOICE_MUTATION } from '../../../ServerQueries/Invoices/Mutations';
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import CircularIndeterminate from '../../atoms/Loader/loader';
import { resetInvoice } from '../../../actions/createInvoiceAction';
import CustomizedSnackbars from '../../atoms/SnackBar/SnackBar';
import generateUUID  from '../../../Utility/uniqueId';

function InvoiceCreation() {
    const dispatch = useDispatch();
    const { proposal } = useSelector(state => state.currentProposal);
    const { Budget } = useSelector(state => state.currentBudget);
    const { header } = useSelector(state => state.createInvoice);
    const navigate = useNavigate();
    const [submitInvoice, { loading, error }] = useMutation(SUBMIT_INVOICE_MUTATION, { errorPolicy: "all" });
    const [invoiceError, setInvoiceError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [invoiceErrorKey, setInvoiceErrorKey] = useState(0);



    const handleDraft = () => {
        //do validation and save file locally
        console.log("Save Draft");
    };

    const initialValuesHeader = {
        Proposal: proposal.title,
        Category: header.Category,
        Recipient: header.Recipient,
        'Invoice Number': header['Invoice Number'],
        Currency: header.Currency,
        Total: header.Total,
        'Invoice Date': header['Invoice Date'],
        'Due Date': header['Due Date'],
        'Upload Invoice': header['Upload Invoice'],
        'Description': header.Description,
    }

    const currentPathConfig = {
        path: "Invoices",
        to: `/proposals/${proposal.id}/invoices`
    }

    const BoxStyle = {
        width: '90%',
        margin: '0rem auto',
        textAlign: "center",
        color: 'white',
        border: ".05rem #2c2c2c solid",
        marginTop: "1rem",
        borderRadius: 3
    };


    const handleValidation = () => {

        if (!header.Category) {
            setInvoiceError("Category field cannot be empty");
            return false;
        }

        if (!header['Invoice Number'] || header['Invoice Number'].length === 0) {
            setInvoiceError("Invoice Number field cannot be empty");
            return false;
        }

        if (!header.Recipient) {
            setInvoiceError("Recipient field cannot be empty");
            return false;
        }

        if (!header.Total) {
            setInvoiceError("Total field cannot be empty");
            return false;
        }

        if (parseInt(header.Total) > parseInt(1000)) {
            setInvoiceError("Total cannot be greater than Allocated amount of Budget");
            return false;
        }

        if (header['Invoice Date'] > header['Due Date']) {
            setInvoiceError("Invoice Date cannot be greater than Due Date");
            return false;
        }

        if (!header.Currency) {
            setInvoiceError("Currency field cannot be empty");
            return false;
        }

        return true;
    };

    const handleSaveInvoice = async (event) => {
        
        let isValid = handleValidation();

        if (!isValid) {
            setInvoiceErrorKey(generateUUID());
            return;
        }

        if (isValid) {
            setInvoiceError(null);
            try {
                await submitInvoice({
                    variables: {
                        ...header,
                        InvoiceNumber: header['Invoice Number'],
                        Total: parseInt(header.Total),
                        InvoiceDate: header['Invoice Date'],
                        DueDate: header['Due Date'],
                        UploadInvoice: "placeholder for now",
                        BudgetId: Budget.id,
                    },
                });

                setSuccessMessage("Invoice saved successfully!");

                // setTimeout(() => {
                //     dispatch(resetInvoice());
                //     navigate(`/proposals/${proposal.id}/invoices`);
                // }, 2000);
            } catch (error) {
                console.log(error)
                if (error.message) {
                    setInvoiceError(`Error: ${error.message}`)
                }

                if (error.response && error.response.errors) {
                    error.response.errors.forEach((err) => {
                        setInvoiceError(`GraphQL Error: ${err.message}`)
                    });
                }

                if (error.networkError) {
                    setInvoiceError(`Network Error: ${error.networkError}`)
                }
            };
        }
    }; 



    const componentButtonConfig =
        [
            {
                label: "Save Draft",
                variant: "contained",
                onClick: handleDraft,
                innerText: "Save Draft",
                backgroundColor: "#282A2E",
                type: "link",
                to: '/proposal/budgets/export-csv',
            }, {
                label: "Save Invoice",
                variant: "contained",
                onClick: handleSaveInvoice,
                innerText: "Save Invoice",
                ml: "0.5rem",
                type: "Submit",
                // redirectTo: `/proposals/${proposal.id}/invoices`,
            }
        ];

    if (loading) return <CircularIndeterminate />;

    return (
        <>
            <SubHeader buttonConfig={componentButtonConfig} currentPath={currentPathConfig} previousPath="Proposals  Proposal  Budget" />
            <form onSubmit={handleSaveInvoice}>
                <Box sx={BoxStyle}>
                    <FormItem
                        initialValues={initialValuesHeader}
                        type="invoice"
                        errors={invoiceError ? invoiceError : null}
                        key={invoiceErrorKey}
                    />
                </Box>
                {successMessage && (
                    <CustomizedSnackbars key="success" message={successMessage} severity="success" autoOpen={true} />
                )}
            </form>
        </>
    )
}

export default InvoiceCreation




