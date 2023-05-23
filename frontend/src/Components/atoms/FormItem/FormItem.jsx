import React from 'react'
import useStyles from './index.style';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { Formik, Form } from 'formik';

function FormItem({ initialValues }) {
    const classes = useStyles();

    const componentStyles = {
        formInputFieldStyles: {
            color: 'white',
            paddin: '0',
            border: '2px solid #2C2C2C',
            borderRadius: '5px',
            
            '& .MuiInputBase-input': {
                padding: '0.5rem',
                color: 'white',
                borderRadius: '5px',
                fontSize: '.85rem',
                fontWeight: 'small',
            },
        },
        typographyLabel: {
            color: 'gray',
            fontSize: ".70rem"
        }
    }

    return (
        <Formik initialValues={initialValues} onSubmit={() => { }}>
            <Form >
                <Box className={classes.boxStyle}>
                    <Grid container
                        className={classes.containerStyles}
                        spacing= '15'
                    >
                        {
                            Object.entries(initialValues).map(([key, value], index) => {
                                return <Grid
                                    item 
                                    xs={index < 2 ? 6 : index === 2 ? 8 : 4}
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
                                        fullWidth
                                        // disabled
                                        sx = {componentStyles.formInputFieldStyles}
                                    />
                                </Grid>
                            })
                        }
                    </Grid>
                </Box>
            </Form>
        </Formik>
    )
}

export default FormItem