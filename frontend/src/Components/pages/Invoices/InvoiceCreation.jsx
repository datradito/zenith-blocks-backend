import React, { useState } from 'react'
import SubHeader from '../../molecules/SubHeader/SubHeader';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import FormItem from '../../atoms/FormItem/FormItem';
import FormRowInvoice from '../../molecules/FormInvoiceCreation';
import { SUBMIT_INVOICE_MUTATION } from '../../../ServerQueries/InvoiceQueries';
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import CircularIndeterminate from '../../atoms/Loader/loader';
import { resetInvoice } from '../../../actions/createInvoiceAction';
import CustomizedSnackbars from '../../atoms/SnackBar/SnackBar';

function InvoiceCreation() {
    const dispatch = useDispatch();
    const { proposal } = useSelector(state => state.currentProposal);
    const { header } = useSelector(state => state.createInvoice);
    const navigate = useNavigate();
    const [submitInvoice, { loading, error }] = useMutation(SUBMIT_INVOICE_MUTATION, { errorPolicy: "all" });
    const [invoiceError, setInvoiceError] = useState(null);

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


    const handleSaveInvoice = async (event) => {

        let errors = {};

        if (!header.Category || !header.Recipient || !header['Invoice Number'] || !header.Currency || !header['Invoice Date'] || !header['Due Date'] || !header['Upload Invoice'] || !header.Description) {
            errors['allFields'] = "Please fill all the fields";
        }

        console.log(errors);
        let convertedInvoiceDate= new Date(header['Invoice Date']);
        if (!(convertedInvoiceDate instanceof Date)) {
            errors['Invoice Date'] = "Invalid date format for 'Invoice Date'";
        } else {
                const { ['Invoice Date']: _, ...rest } = errors;
                errors = rest;
        }

        let convertedDate = new Date(header['Due Date']);

        if (!(convertedDate instanceof Date)) {
            errors['Due Date'] = "Invalid date format for 'Due Date'";
        } else {
                const { ['Invoice Date']: _, ...rest } = errors;
                errors = rest;
        }

        if (header['Invoice Date'] > header['Due Date']) {
            errors['Invoice Date'] = "Invoice Date cannot be greater than Due Date";
        }

        if (!header.Currency) {
            errors['Currency'] = "Currency field cannot be empty";
        } else {
            // Check if Currency is a valid number (Float)
            const parsedCurrency = parseFloat(header.Currency);
            if (isNaN(parsedCurrency)) {
                errors['Currency'] = "Invalid value for Currency";
            }
        }
        setInvoiceError(Object.keys(errors).length > 0 ? errors : null);

        console.log(invoiceError);
        if (Object.keys(errors).length === 0) {
            await submitInvoice({
                variables: {
                    Category: header.Category,
                    Recipient: header.Recipient,
                    InvoiceNumber: header['Invoice Number'],
                    Currency: parseInt(header.Currency),
                    InvoiceDate: header['Invoice Date'],
                    DueDate: header['Due Date'],
                    UploadInvoice: header['Upload Invoice'],
                    Description: header.Description,
                },
            }).then((res) => {
                <CustomizedSnackbars message="Invoice saved successfully!" severity="success" autoOpen={true} />
                setTimeout(() => {
                    dispatch(resetInvoice());
                    navigate(`/proposals/${proposal.id}/invoices`);
                }, 2000)
            }).catch((error) => {

                if (error.graphQLErrors) {
                    error.graphQLErrors.forEach(({ message }) => {
                        console.log(message);
                    });
                }
                if (error.networkError) {
                    console.log(`Network Error: ${error.networkError}`);
                }
            });
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
                preventDefault: true,
                type: "Submit",
                // redirectTo: `/proposals/${proposal.id}/invoices`,
            }
        ];

    if (loading) return <CircularIndeterminate />;

    return (
        <form onSubmit={handleSaveInvoice}>
            <SubHeader buttonConfig={componentButtonConfig} currentPath={currentPathConfig} previousPath="Proposals  Proposal  Budget" />
            <Box sx={BoxStyle}>
                <FormItem initialValues={initialValuesHeader} type="invoice" />
                <FormRowInvoice tableHeaderData={["", "Category", "Notes", "Price", "Quantity", "Total"]} />
            </Box>
            {invoiceError && (
                <>
                    {Object.entries(invoiceError).map(([key, message]) => (
                        <CustomizedSnackbars key={key} message={message} severity="error" autoOpen={true} />
                    ))}
                </>
            )}
        </form>
    )
}

export default InvoiceCreation




