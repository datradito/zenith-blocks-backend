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
import generateUUID from '../../../Utility/uniqueId';
import { useGetAllInvoicesByBudget } from '../../hooks/Invoices/useGetAllInvoices';

const BoxStyle = {
    width: '90%',
    margin: '0rem auto',
    textAlign: "center",
    color: 'white',
    border: ".05rem #2c2c2c solid",
    marginTop: "1rem",
    borderRadius: 3
};

const handleDraft = () => {
    //do validation and save file locally
    console.log("Save Draft");
};

function InvoiceCreation() {
    const dispatch = useDispatch();
    const { proposal } = useSelector(state => state.currentProposal);
    const { Budget } = useSelector(state => state.currentBudget);
    const { header } = useSelector(state => state.createInvoice);
    const navigate = useNavigate();
    const [submitInvoice, { loading, error }] = useMutation(SUBMIT_INVOICE_MUTATION,
        {
            errorPolicy: "all",
        }
    );
    const {refetch} = useGetAllInvoicesByBudget(Budget?.id);
    const [invoiceError, setInvoiceError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [invoiceErrorKey, setInvoiceErrorKey] = useState(0);


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
        to: `/proposal/${proposal.id}/invoices`
    }


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
            const owneraddress = sessionStorage.getItem("address");
                await submitInvoice({
                    variables: {
                        invoice: {
                            category: header.Category,
                            recipient: header.Recipient,
                            owneraddress: owneraddress,
                            proposal: proposal.id,
                            number: header['Invoice Number'],
                            budgetid: Budget.id,
                            total: parseInt(header.Total),
                            currency: header.Currency,
                            date: header['Invoice Date'],
                            duedate: header['Due Date'],
                            description: header.Description,
                            uploadinvoice: "placeholder for now",
                        }
                    },
                }).then((res) => {
                    if (res.data.submitInvoice !== null) {
                        setSuccessMessage("Invoice saved successfully!")
                        setTimeout(() => {
                            dispatch(resetInvoice());
                            navigate(`/proposal/${proposal.id}/invoices`);
                            refetch();
                        }, 2000);
                    }

                }).catch((error) => {
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
                type: "Submit",
                redirectTo: `/proposal/${proposal.id}/invoices`,
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




