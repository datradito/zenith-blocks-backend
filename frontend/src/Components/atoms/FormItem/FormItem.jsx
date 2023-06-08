import React from 'react';
import useStyles from './index.style';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { Formik, Form } from 'formik';

function FormItem({ initialValues, type }) {
    const classes = useStyles();

    const componentStyles = {
        formInputFieldStyles: {
            color: 'white',
            padding: '0',
            border: '2px solid #2C2C2C',
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
                                    <TextField
                                        name={key}
                                        defaultValue={value}
                                        //type={key === 'Upload Invoice' ? 'file' : key === 'Due Date' ? 'date' : key === 'Invoice Number' ? 'number' : 'text'}
                                        InputProps={{
                                            readOnly: key === 'Proposal' || key === 'Goverance' || key === 'Ipfs Link' ? true : false
                                        }}
                                        multiline
                                        rows={key === 'Description' || key === 'Upload Invoice' ? 4 : 1}
                                        fullWidth
                                        // disabled
                                        sx = {componentStyles.formInputFieldStyles}
                                    />
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