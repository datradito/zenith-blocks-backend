import React, { useEffect } from 'react';
import useStyles from './index.style';
import {
    Box,
    Button,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
} from '@mui/material';
import TableHeader from '../../atoms/TableHeader/index';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import { useDispatch, useSelector } from 'react-redux';

function FormRow() {
    const dispatch = useDispatch();
    let { items } = useSelector(state => state.createBudget);
    const classes = useStyles();

    // const getStateOnLoad = () => {
    //     items = dispatch({ type: 'GET_ALL_ROWS' });
    // };

    const handleAddRow = () => {
        dispatch({ type: 'ADD_ROW', payload: { action: '-', category: '', currency: '', percentage: '', breakdown: '' } });
    };

    const handleDeleteRow = (index) => {
        dispatch({ type: 'DELETE_ROW', payload: index });
    };

    const handleChange = (index, field, value) => {
        dispatch({ type: 'UPDATE_FIELD', payload: { index, field, value } });
    };

    const formStyleCustom = {
        currencyDropdown: {
            color: 'white',
            '& .MuiTableCell-root': {
                color: 'white',
                backgroundColor: '#2C2C2C',
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
                margin: '0'
            }
        },
        default: {
            color: 'white',
            paddin: '0',
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

    return (
        <Box className={classes.boxStyle}>
            <TableContainer>
                <Table>
                    <TableHeader
                        tableHeaderData={["", "Category", "Currency", "Percentage", "Breakdown"]}
                    />
                    <TableBody >
                        {items && items.map((item, index) => (
                            <TableRow
                                key={index}
                            >
                                <TableCell
                                    style={{ border: 'none', width: '25', padding: '0.5rem' }}
                                    sx={formStyleCustom.default}>
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
                                        value={item.category}
                                        onChange={(e) => handleChange(index, 'category', e.target.value)}
                                        fullWidth
                                        sx={formStyleCustom.textFieldStyle}
                                        
                                    />
                                </TableCell>
                                <TableCell
                                    style={{ width: '200px', border: 'none', padding: '0.5rem' }}
                                    sx={formStyleCustom.default}
                                >
                                    <Select
                                        value={item.currency}
                                        onChange={(e) => handleChange(index, 'currency', e.target.value)}
                                        sx = {[formStyleCustom.currencyDropdown, formStyleCustom.default]}
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
                                        value={item.percentage}
                                        onChange={(e) => handleChange(index, 'percentage', e.target.value)}
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
                                    style={{ border: 'none' , padding: '0.5rem'}}
                                    sx={formStyleCustom.default}>
                                    <TextField
                                        value={item.breakdown}
                                        onChange={(e) => handleChange(index, 'breakdown', e.target.value)}
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

                        ))}
                    </TableBody>
                    {/* <TableBody tableBodyData={items} /> */}
                </Table>
            </TableContainer>
            <Box mt={2}>
                <Button variant="contained" onClick={handleAddRow}>
                    Add Row
                </Button>
            </Box>
        </Box>
    );
}

export default FormRow;
