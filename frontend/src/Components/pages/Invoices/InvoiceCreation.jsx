import React from 'react'
import SubHeader from '../../molecules/SubHeader/SubHeader';
import { useSelector } from 'react-redux';
import { Box, Stack, Grid, Typography } from '@mui/material';
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import FormItem from '../../atoms/FormItem/FormItem';
import FormRowInvoice from '../../molecules/FormInvoiceCreation';
// import { PDFViewer } from 'react-pdf';


function InvoiceCreation() {
    const { proposal } = useSelector(state => state.currentProposal);
    

    const handleDraft = () => {
        //do validation and save file locally
        console.log("Save Draft");
    };

    const initialValuesHeader = {
        Proposal: proposal.title,
        Category: "",
        Recipient: "",
        'Invoice Number': '',
        Currency: '',
        'Invoice Date': '',
        'Due Date': '',
        'Upload Invoice': '',
        'Description': '',
    };

    const initialValuesLines = {
        Price: '',
        Quantity: '',
        Total: '',
    }

    const validationSchemaHeader = yup.object({
        Category: yup.string().required('Category is required'),
        Recipient: yup.string().required('Recipient is required'),
        'Invoice Number': yup.string().required('Invoice Number is required'),
        Currency: yup.string().required('Currency is required'),
        'Invoice Date': yup.date().required('Invoice Date is required'),
        'Due Date': yup.date().required('Due Date is required'),
        'Upload Invoice': yup.string().required('Upload Invoice is required'),
        Description: yup.string().required('Description is required'),
    });


    const validationSchemaLines = yup.object({
        Price: yup.number().required('Price is required'),
        Quantity: yup.number().required('Quantity is required'),
        // 'Total Price': yup.number().required('Total Price is required'),
        // 'Description': yup.string().required('Description is required'),
    });


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

    //invoice form
    const formik = useFormik({
        initialValues: initialValuesHeader,
        validationSchema: validationSchemaHeader,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const formikLines = useFormik({
        initialValues: initialValuesLines,
        validationSchema: validationSchemaLines,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    
    // const formik = useFormik({
    //     initialValues: {
    //         initialValuesHeader,
    //         initialValuesLines, 
    //     },
    //     validationSchema: yup.object().shape({
    //         ...validationSchemaHeader,
    //         ...validationSchemaLines,
    //     }),
    //     onSubmit: (values) => {
    //         alert(JSON.stringify(values, null, 2));
    //     },
    // });


    const handleSaveInvoice = () => {
        //here add logic to check all invoice field are valid and then save file locally - sync it ipfs
        formik.handleSubmit();
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
                redirectTo: `/proposals/${proposal.id}/invoices`,
            }
        ];

  return (
      <form onSubmit={formik.handleSubmit}>
          <SubHeader buttonConfig={componentButtonConfig} currentPath={currentPathConfig} previousPath="Proposals  Proposal  Budget" />
          <Box sx={BoxStyle}>
              <FormItem initialValues={initialValuesHeader} type="invoice" formik={formik}/>
              <FormRowInvoice tableHeaderData={["", "Category", "Notes", "Price", "Quantity", "Total"]} formik={formik} />
          </Box>
    </form>
  )
}

export default InvoiceCreation

