import React, { useEffect } from 'react';
import useStyles from './index.style';
import {
    Box,
    Button,
    MenuItem,
    Select,
    TableBody,
    TableCell,
    TableRow,
    TextField,
} from '@mui/material';
import TableHeader from '../../atoms/TableHeader/index';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import { useDispatch, useSelector } from 'react-redux';
import ButtonAtom from '../../atoms/Button';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormItem from '../../atoms/FormItem/FormItem';

function FormRowInvoice({ tableHeaderData }) {
    const dispatch = useDispatch();
    let currentProposal = useSelector(state => state.currentProposal);
    let classes = useStyles();
    // const [proposalIsSet, setProposalIsSet] = React.useState(false);
    let { header, lines} = useSelector(state => state.createInvoice);

    const handleDeleteRow = (index) => {
        dispatch({ type: 'DELETE_ROW_INVOICE', payload: index });
    };

    const handleAddRow = () => {
        dispatch({ type: 'ADD_ROW_INVOICE', payload: { action: '-', Category: '', Notes: '', Price: '', Quantity: '', Total: '' } });
    };

    const handleChange = (index, field, value) => {
        dispatch({ type: 'UPDATE_FIELD_INVOICE', payload: { index, field, value } });
    };

    const formStyleCustom = {
        // currencyDropdown: {
        //     '& .MuiTableCell-root': {
        //         color: 'white',
        //         backgroundColor: '#2C2C2C',
        //         fontSize: '0.85rem',
        //     },
        //     '& .MuiInputBase-root': {
        //         fontSize: '.85rem',
        //     },
        //     '& .MuiSelect-root': {
        //         fontSize: '.85rem',
        //     },
        //     '& .MuiSvgIcon-root': {
        //         color: 'white',
        //     },
        // },
        textFieldStyle: {
            '& .MuiInputBase-root': {
                color: 'white',
                border: '2px solid #2C2C2C',
                backgroundColor: '#1A1C1E',
                margin: '0',
                fontSize: '.85rem',
            }
        },
        default: {
            color: 'white',
            padding: '0',
            border: '2px solid #2C2C2C',
            '& .MuiInputBase-input': {
                padding: '0.5rem',
                fontSize: '.85rem',
            },
            '& .MuiButtonBase-root': {
                minWidth: 'initial',

            }
        },
        buttonStyles: {
            color: 'white',
            padding: '0',
        },
        action: {
            color: 'white',
            width: '25px',
        }
    };

    const buttonConfig = {
        label: "Add Row",
        variant: "contained",
        onClick: handleAddRow,
        innerText: "Add New"
    };


    return (
        <Box className={classes.boxStyle}>
            <Formik>
                <Form>
                    {/* <FormItem initialValues={dataForItemCard} /> */}
                    <TableHeader
                        tableHeaderData={tableHeaderData}
                    />
                    <TableBody >
                        {lines && lines.map((item, index) => {
                            return <TableRow
                                key={index}
                            >
                                <TableCell
                                    style={{ border: 'none', width: '25', padding: '0.5rem' }}
                                    sx={formStyleCustom.default}
                                    required>
                                    <Button
                                        startIcon={<RemoveCircleOutlineSharpIcon />}
                                        onClick={() => handleDeleteRow(index)}
                                        sx={formStyleCustom.buttonStyles}
                                    >
                                        {/* {item.action} */}
                                    </Button>
                                </TableCell>
                                <TableCell
                                    style={{ width: '20rem', border: 'none', padding: '0.5rem' }}
                                    sx={formStyleCustom.default}>

                                    <TextField
                                        required
                                        value={item.Category}
                                        onChange={(e) => handleChange(index, 'Category', e.target.value)}
                                        fullWidth
                                        sx={formStyleCustom.textFieldStyle}

                                    />
                                </TableCell>
                                <TableCell
                                    style={{ width: '30rem', border: 'none', padding: '0.5rem' }}
                                    sx={formStyleCustom.default}
                                >
                                    <TextField
                                        required
                                        value={item.Notes}
                                        onChange={(e) => handleChange(index, 'Notes', e.target.value)}
                                        sx={formStyleCustom.textFieldStyle}
                                        style={{ fontSize: '.85rem', width: '100%' }}

                                    />
                                </TableCell>
                                <TableCell
                                    style={{ border: 'none', padding: '0.5rem' }}
                                    sx={formStyleCustom.default}>
                                    <TextField
                                        required
                                        value={item.Price}
                                        type="number"
                                        onChange={(e) => handleChange(index, 'Price', e.target.value)}
                                        InputProps={{
                                            style: {
                                                color: 'white',
                                                border: '2px solid #2C2C2C',
                                                backgroundColor: '#1A1C1E',
                                                minWidth: '200px',
                                            },
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    style={{ border: 'none', padding: '0.5rem' }}
                                    sx={formStyleCustom.default}>
                                    <TextField
                                        required
                                        type='number'
                                        value={item.Quantity}
                                        onChange={(e) => handleChange(index, 'Quantity', e.target.value)}
                                        InputProps={{
                                            style: {
                                                color: 'white',
                                                border: '2px solid #2C2C2C',
                                                backgroundColor: '#1A1C1E',
                                                minWidth: '200px',
                                            },
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    style={{ border: 'none', padding: '0.5rem' }}
                                    sx={formStyleCustom.default}>
                                    <TextField
                                        required
                                        type='number'
                                        value={item.Total}
                                        onChange={(e) => handleChange(index, 'Total', e.target.value)}
                                        InputProps={{
                                            style: {
                                                color: 'white',
                                                border: '2px solid #2C2C2C',
                                                backgroundColor: '#1A1C1E',
                                                minWidth: '200px',
                                            },
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Form>
            </Formik>
            <Box>
                <ButtonAtom config={buttonConfig} />
            </Box>
        </Box>
    );
}

export default FormRowInvoice;
