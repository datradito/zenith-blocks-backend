import React from 'react';
import { Box, Grid, TextField, Typography, FormControl } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateHeader } from './../../../actions/createInvoiceAction/index.js';
import { categories } from '../../pages/Category/Category';
import UnstyledSelectBasic from '../SelectDropdown/SelectDropdown';
import useStyles from './index.style';
import { Upload } from "@web3uikit/core";
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown.jsx';
import FormRow from "../../molecules/FormBudgetCreation/index.jsx";
import CustomizedSnackbars from '../SnackBar/SnackBar.jsx';

function FormItem({ initialValues, type, errors, maxAmount}) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const componentStyles = {
        formInputFieldStyles: {
            color: 'white',
            padding: '0',
            border: ".08rem #2c2c2c solid",
            borderRadius: '5px',
            backgroundColor: 'black',

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
            '& .MuiSvgIcon-root': {
                color: 'white',
            },
        },
        typographyLabel: {
            color: 'gray',
            fontSize: ".70rem"
        },
    }
    

    const handleChange = (key, value) => {
        dispatch(updateHeader(key, value));
    };

    return (
        <>
            <Box
                className={classes.boxStyle}
            >
                    <Grid container className={classes.containerStyles} spacing={3}>
                        {Object.entries(initialValues).map(([key, value], index) => (
                            <Grid item xs={type === 'budget' ? (index < 2 ? 6 : index === 2 ? 8 : 4) : (index < 2 ? 6 : index === 2 ? 7 : index === 3 ? 3 : index === 4 ? 2 : index > 4 && index < 7 ? 4 : index === 7 ? 4 : 6)} key={index}>
                                <Typography variant="h6"
                                    sx={componentStyles.typographyLabel}
                                >{key}</Typography>
                                {key === 'Currency' ? (
                                    <CurrencyDropdown
                                        value={initialValues[key]}
                                        sx={componentStyles.formInputFieldStyles}
                                        onChange={(e) => handleChange(key, e.target.value)}
                                    />)
                                    :
                                    key === 'Due Date' || key === 'Invoice Date' ? (
                                        <FormControl
                                            required
                                            fullWidth
                                        >
                                        <TextField
                                            required
                                            type='date'
                                            fullWidth
                                            value={initialValues[key]}
                                            sx={componentStyles.formInputFieldStyles}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                            />
                                            </FormControl>
                                ) :
                                    key === 'Category' ? (
                                        <UnstyledSelectBasic defaultValue={initialValues.Category} values={categories} onChange={(value) => handleChange(key, value)} />
                                        ) :
                                            key === 'Upload Invoice' ? (
                                                <Upload
                                                    acceptedFiles="image/jpeg"
                                                    descriptionText="Only .jpeg files are accepted"
                                                    onChange={function noRefCheck() { }}
                                                    style={{
                                                        width: "100%",
                                                        maxHeight: "120px",
                                                        border: ".08rem #2c2c2c solid",
                                                        borderRadius: '5px',
                                                        backgroundColor: 'black',
                                                    }}
                                                    theme="withIcon"
                                                />):
                                            
                                            key === 'Invoice Number' ? (
                                                <TextField
                                                    required
                                                    fullWidth
                                                    value={initialValues[key]}
                                                    sx={componentStyles.formInputFieldStyles}
                                                    onChange={(e) => handleChange(key, e.target.value)}
                                                />
                                                ) :
                                                    key === 'Total' ? (
                                                        <TextField
                                                            required
                                                            type="number"
                                                            fullWidth
                                                            value={initialValues[key]}
                                                            sx={componentStyles.formInputFieldStyles}
                                                            onChange={(e) => handleChange(key, e.target.value)}
                                                        />
                                                    ):
                                                (
                                        <TextField
                                            name={key}
                                            required
                                            value={initialValues[key]}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                            fullWidth
                                            multiline={key === 'Description' || key === 'Upload Invoice'}
                                            rows={key === 'Description' || key === 'Upload Invoice' ? 4 : 1}
                                            InputProps={{
                                                readOnly: key === 'Proposal' || key === 'Goverance' || key === 'Ipfs Link' || key === 'Total Budget',
                                            }}
                                            sx={componentStyles.formInputFieldStyles}
                                            />
                                )}
                            </Grid>
                        ))}
                    {type === 'budget' &&
                        <FormRow
                            tableHeaderData={["Category", "Amount", "Currency", "Breakdown"]} />
                    }

                    {errors &&
                        <CustomizedSnackbars message={errors} severity="error" autoOpen={true} />
                    }
                    </Grid>
                </Box>
        </>
    );
}

export default FormItem;
