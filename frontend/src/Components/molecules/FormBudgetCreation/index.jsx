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

function FormRow({ tableHeaderData }) {
    const dispatch = useDispatch();
    let currentProposal = useSelector(state => state.currentProposal);
    let classes = useStyles();
    let { items, proposal } = useSelector(state => state.createBudget);

    //Todo: Implement Proposal amount - allocated budget validation so that total budget amount does not exceed the total proposal amount
    //Todo: Fix setting proposal correctly in initial state, implement hash funciton in store to generate unique id for each budget

    useEffect(() => {
        const setProposalData = async () => {
            await dispatch({ type: 'SET_INITIAL_STATE', payload: currentProposal.proposal });
        }
        setProposalData();
        const storedState = JSON.parse(localStorage.getItem('persist:root'));
        
        
        console.log(storedState.currentProposal);
    }, []);


    const handleAddRow = () => {
        dispatch({ type: 'ADD_ROW', payload: { action: '-', Categories: '', "Allocated Budget": '', Currency: '', Breakdown: '' } });
    };

    const handleDeleteRow = (index) => {
        dispatch({ type: 'DELETE_ROW', payload: index });
    };

    const handleChange = (index, field, value) => {
        dispatch({ type: 'UPDATE_FIELD', payload: { index, field, value } });
    };

    const formStyleCustom = {
        currencyDropdown: {
            '& .MuiTableCell-root': {
                color: 'white',
                backgroundColor: '#2C2C2C',
                fontSize: '0.85rem',
            },
            '& .MuiInputBase-root': {
                fontSize: '.85rem',
            },
            '& .MuiSelect-root': {
                fontSize: '.85rem',
            },
            '& .MuiSvgIcon-root': {
                color: 'white',
            },
        },
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
                        {items && items.map((item, index) => (
                            <TableRow
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
                                    style={{ width: '100%', border: 'none', padding: '0.5rem' }}
                                    sx={formStyleCustom.default}>

                                    <TextField
                                        value={item.Categories}
                                        onChange={(e) => handleChange(index, 'Categories', e.target.value)}
                                        fullWidth
                                        sx={formStyleCustom.textFieldStyle}

                                    />
                                </TableCell>
                                <TableCell
                                    style={{ border: 'none', padding: '0.5rem' }}
                                    sx={formStyleCustom.default}>
                                    <TextField
                                        value={item["Allocated Budget"]}
                                        type="number"
                                        onChange={(e) => handleChange(index, 'Allocated Budget', e.target.value)}
                                        InputProps={{
                                            style: {
                                                color: 'white',
                                                border: '2px solid #2C2C2C',
                                                backgroundColor: '#1A1C1E',
                                                minWidth: '200px',
                                            },
                                            inputProps: {
                                                pattern: '[0-9]*', // Regex pattern to allow only numbers
                                                title: 'Please enter numbers only', // Error message for invalid input
                                            },
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    style={{ width: '200px', border: 'none', padding: '0.5rem' }}
                                    sx={formStyleCustom.default}
                                >
                                    <Select
                                        value={item.Currency}
                                        onChange={(e) => handleChange(index, 'Currency', e.target.value)}
                                        sx={[formStyleCustom.currencyDropdown, formStyleCustom.default]}
                                        style={{ fontSize: '.85rem' }}
                                    >
                                        {/* <MenuItem value={item.currency}>{item.currency}</MenuItem> */}
                                        <MenuItem value="USD"
                                            color='primary'>USD</MenuItem>
                                        <MenuItem value="EUR">EUR</MenuItem>
                                        <MenuItem value="GBP">GBP</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell
                                    style={{ border: 'none', padding: '0.5rem' }}
                                    sx={formStyleCustom.default}>
                                    <TextField
                                        
                                        value={`${500 / item["Allocated Budget"]}%`}
                                        onChange={(e) => handleChange(index, 'Breakdown', e.target.value)}
                                        InputProps={{
                                            style: {
                                                color: 'white',
                                                border: '2px solid #2C2C2C',
                                                backgroundColor: '#1A1C1E',
                                                minWidth: '200px',
                                            },
                                            readOnly: true,
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Form>
            </Formik>
            <Box>
                <ButtonAtom config={buttonConfig} />
            </Box>
        </Box>
    );
}

export default FormRow;


// { \"action\":\"-\",\"Category\":\"\",\"Amount\":\"\",\"Currency\":\"\",\"Breakdown\":\"\",\"Categories\":\"hgdh\",\"Allocated Budget\":\"sfe\"},
// { \"action\":\"-\",\"Category\":\"\",\"Amount\":\"\",\"Currency\":\"EUR\",\"Breakdown\":\"\",\"Categories\":\"xbfdffdvddfv\",\"Allocated Budget\":\"fdbdd\"}],\"proposal\":{}}"
