import React from 'react';
import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import { Formik, Form, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { updateHeader } from './../../../actions/createInvoiceAction/index.js';
import BasicDate from "../BasicDate/BasicDate";
import { categories } from '../../pages/Category/Category';
import UnstyledSelectBasic from '../SelectDropdown/SelectDropdown';
import useStyles from './index.style';


function FormItem({ initialValues, type, formik }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const componentStyles = {
        formInputFieldStyles: {
            color: 'white',
            padding: '0',
            border: ".08rem #2c2c2c solid",
            borderRadius: '5px',

            '& .MuiInputBase-input': {
                padding: '0.5rem',
                color: 'white',
                borderRadius: '5px',
                fontSize: '.85rem',
                fontWeight: 'small',
            },

            '& .MuiInputBase-root': {
                padding: '0',
            },
        },
        typographyLabel: {
            color: 'gray',
            fontSize: ".70rem"
        },
    }

    const handleChange = (key, value) => {
        dispatch(updateHeader(key, value));
        initialValues[key] = value;
        formik.handleChange(key, value);
        let error = formik.touched[key] && Boolean(formik.errors[key]) 
        console.log(formik.errors[key]);
    };


    return (
        <>
                <Box className={classes.boxStyle}>
                    <Grid container className={classes.containerStyles} spacing={3}>
                        {Object.entries(initialValues).map(([key, value], index) => (
                            <Grid item xs={type === 'budget' ? (index < 2 ? 6 : index === 2 ? 8 : 4) : (index < 2 ? 6 : index === 2 ? 7 : index === 3 ? 3 : index === 4 ? 2 : index > 4 && index < 7 ? 6 : index === 7 ? 4 : 8)} key={index}>
                                <Typography variant="h6"
                                    sx={componentStyles.typographyLabel}
                                >{key}</Typography>
                                {
                                //     key === 'Due Date' || key === 'Invoice Date' ? (
                                //     <BasicDate label={''} />
                                // ) :
                                    key === 'Category' ? (
                                    <UnstyledSelectBasic values={categories} onChange={(value) => handleChange(key, value)} />
                                ) : (
                                    <TextField
                                        name={key}
                                                // value={formik.values[key]}
                                        defaultValue={value}
                                        onChange={(e) => handleChange(key, e.target.value)}
                                        onBlur={formik.handleBlur}
                                        fullWidth
                                        multiline={key === 'Description' || key === 'Upload Invoice'}
                                        rows={key === 'Description' || key === 'Upload Invoice' ? 4 : 1}
                                        InputProps={{
                                            readOnly: key === 'Proposal' || key === 'Goverance' || key === 'Ipfs Link',
                                        }}
                                        sx={componentStyles.formInputFieldStyles}
                                        
                                        //helperText={formik.touched[key] && formik.errors[key]}
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Box>
        </>
    );
}

export default FormItem;
