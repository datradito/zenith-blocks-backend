import React from 'react';
import useStyles from './index.style';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { updateHeader } from './../../../actions/createInvoiceAction/index.js';
import BasicDate from "../BasicDate/BasicDate"
import { categories } from '../../pages/Category/Category';
import UnstyledSelectBasic from '../SelectDropdown/SelectDropdown';

function FormItem({ initialValues, type }) {
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
        initialValues[key] = value;
        dispatch(updateHeader(key,value));
        console.log(initialValues);
    }


    return (
        // <Formik initialValues={initialValues} onSubmit={() => { }}>
        //     <Form >
                <Box className={classes.boxStyle}>
                    <Grid container
                        className={classes.containerStyles}
                        spacing= '15'
                    >
                        {
                            Object.entries(initialValues).map(([key, value], index) => {
                                return <Grid
                                    item 
                                    xs={type === 'budget' ? (index < 2 ? 6 : index === 2 ? 8 : 4) : (index < 2 ? 6 : index === 2 ? 7 : index === 3 ? 3 : index === 4 ? 2 : index > 4 && index < 7 ? 6: index === 7 ? 4 : 8)}
                                    key={index}
                                    >
                                    <Typography
                                        variant='h6'
                                        sx={componentStyles.typographyLabel}
                                    >
                                        {key}
                                    </Typography>
                                    {key === "Due Date" || key === "Invoice Date" ? <BasicDate label={""} /> : 
                                        key === "Category" ?
                                            <UnstyledSelectBasic values={categories} onChange={(value) => handleChange(key, value)} />
                                            :
                                        <TextField
                                            name={key}
                                            defaultValue={value}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                            //type={key === 'Upload Invoice' ? 'file' : key === 'Due Date' ? 'date' : key === 'Invoice Number' ? 'number' : 'text'}
                                            InputProps={{
                                                readOnly: key === 'Proposal' || key === 'Goverance' || key === 'Ipfs Link' ? true : false
                                            }}
                                            multiline
                                            rows={key === 'Description' || key === 'Upload Invoice' ? 4 : 1}
                                            fullWidth
                                            // disabled
                                            sx={componentStyles.formInputFieldStyles}
                                        />}
                                </Grid>
                            })
                        }
                    </Grid>
                </Box>
        //     </Form>
        // </Formik>
    )
}

export default FormItem