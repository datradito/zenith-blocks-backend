import React from 'react'
import SubHeader from '../../molecules/SubHeader/SubHeader';
import { useSelector } from 'react-redux';
import { Box, Stack, Grid, Typography } from '@mui/material';
import * as yup from 'yup';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { TextField } from '@material-ui/core';
// import DatePicker from '@mui/lab/DatePicker';
// import { Button } from '@material-ui/core';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import ButtonAtom from '../../atoms/Button';
import FormItem from '../../atoms/FormItem/FormItem';
import FormRowInvoice from '../../molecules/FormInvoiceCreation';
// import { PDFViewer } from 'react-pdf';

function InvoiceCreation() {
    const { proposal } = useSelector(state => state.currentProposal);

    console.log(proposal)
    const handleDraft = () => {
        //do validation and save file locally
        console.log("Save Draft");
    };

    const handleSaveInvoice = () => {
        //here add logic to check all invoice field are valid and then save file locally - sync it ipfs
        console.log("Save Invoice");
    };


    const currentPathConfig = {
        path: "Invoices",
        to: `/proposals/${proposal.id}/invoices`
    }

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
                type: "link",
                to: `/proposals/${proposal.id}/invoices`,
            }
        ];
    
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
    // const formik = useFormik({
    //     initialValues: {
    //         email: 'foobar@example.com',
    //         password: 'foobar',
    //     },
    //     validationSchema: validationSchema,
    //     onSubmit: (values) => {
    //         alert(JSON.stringify(values, null, 2));
    //     },
    // });

    const validationSchema = yup.object({
    //     email: yup
    //         .string('Enter your email')
    //         .email('Enter a valid email')
    //         .required('Email is required'),
    //     password: yup
    //         .string('Enter your password')
    //         .min(8, 'Password should be of minimum 8 characters length')
    //         .required('Password is required'),
        invoice: yup.number().integer('Please enter a valid integer').required('Invoice is required'),
        dueDate: yup.date().required('Due Date is required').required('Due Date is required'),
        uploadInvoice: yup.mixed().required('Upload Invoice is required').required('Upload Invoice is required'),
    });

    const initialValues = {
        Proposal: proposal.title,
        Category: "",
        Recipient: "",
        'Invoice Number': '',
        Currency:'',
        'Invoice Date': '',
        'Due Date': '',
        'Upload Invoice': '',
        'Description': '',
};

const onSubmit = (values) => {
    console.log(values);
};
    
    const submitConfig = {
        innerText: "Submit",
        type: "submit",
        variant: "contained",
        backgroundColor: "#055FFC",
        ml: "0.5rem",
        onClick: () => { },
    }

    
    

  return (
    <div>
          <SubHeader buttonConfig={componentButtonConfig} currentPath={currentPathConfig} previousPath="Proposals  Proposal  Budget" />
          <Box sx={BoxStyle}>
              <FormItem initialValues={initialValues}  type="invoice" />
              <FormRowInvoice tableHeaderData={["", "Category", "Notes", "Price", "Quantity", "Total"]} />
          </Box>
          
    </div>
  )
}

export default InvoiceCreation

