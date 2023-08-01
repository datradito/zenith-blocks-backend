import React from 'react';
import useStyles from './index.style';
import {
    Box,
    Button,
    TextField,
    FormControl
} from '@mui/material';

import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import { useDispatch, useSelector } from 'react-redux';
import ButtonAtom from '../../atoms/Button';
import UnstyledSelectBasic from '../../atoms/SelectDropdown/SelectDropdown';
import { categories } from '../../pages/Category/Category';


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
        textFieldStyle: {
            '& .MuiInputBase-root': {
                color: 'white',
                border: '2px solid #2c2c2c',
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
            mt: '0.5rem',
        },
        action: {
            color: 'white',
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
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                border: 'none',
                padding: '0.1rem',
                color: 'white',
                backgroundColor: 'rgba(40, 42, 46, 0.5)',
                fontSize: '0.75rem',
                color: "gray",
            }}>
                {/* Render the header data */}
                {tableHeaderData.map((item, index) => (
                    <FormControl key={index} sx={{
                        width: index === 0 ? '25px' : index === 1 ? '20%' : index === 2 ? '40%' : index === 3 ? '10%' : index === 4 ? '10%' : '10%',
                        padding: '0.5rem'
                    }}>
                        {item}
                    </FormControl>
                ))}
            </Box>
                
            {lines && lines.map((item, index) => {
                return <Box
                    key={index}
                >
                    <FormControl
                        style={{ border: 'none', width: '25', padding: '0.5rem' }}
                        sx={formStyleCustom.default}
                        
                        required
                    >
                        <Button
                            startIcon={<RemoveCircleOutlineSharpIcon />}
                            onClick={() => handleDeleteRow(index)}
                            sx={formStyleCustom.buttonStyles}
                        >
                            {/* {item.action} */}
                        </Button>
                    </FormControl>
                    <FormControl
                        style={{ width: '20%', border: 'none', padding: '0.5rem' }}
                        sx={formStyleCustom.default}
                    >
                        <UnstyledSelectBasic
                            defaultValue={item.Category}
                            values={categories}
                            onChange={(value) => handleChange(index, 'Category', value)}
                        />
                    </FormControl> 
                    
                    <FormControl
                        style={{ width: '40%', border: 'none', padding: '0.5rem' }}
                        sx={formStyleCustom.default}
                    >
                        <TextField
                            required
                            defaultValue={item.Notes}
                            // value={item.Notes}
                            onChange={(e) => handleChange(index, 'Notes', e.target.value)}
                            sx={formStyleCustom.textFieldStyle}
                            style={{ fontSize: '.85rem', width: '100%' }}
                            // helperText="Incorrect entry."
                        />
                    </FormControl>
                    <FormControl
                        style={{ border: 'none', padding: '0.5rem', width: '10%' }}
                        sx={formStyleCustom.default}>
                        <TextField
                            required
                            value={item.Price}
                            // defaultValue={item.Price}
                            type="number"
                            onChange={(e) => handleChange(index, 'Price', e.target.value)}
                            InputProps={{
                                style: {
                                    color: 'white',
                                    border: '2px solid #2C2C2C',
                                    backgroundColor: '#1A1C1E',
                                },
                            }}
                        />
                    </FormControl>
                    <FormControl
                        style={{ border: 'none', padding: '0.5rem', width: '10%' }}
                        sx={formStyleCustom.default}>
                        <TextField
                            required
                            type='number'
                            defaultValue={item.Quantity}
                            // value={item.Quantity}
                            onChange={(e) => handleChange(index, 'Quantity', e.target.value)}
                            InputProps={{
                                style: {
                                    color: 'white',
                                    border: '2px solid #2C2C2C',
                                    backgroundColor: '#1A1C1E',
                                },
                            }}
                        />
                    </FormControl>
                    <FormControl
                        style={{ border: 'none', padding: '0.5rem', width: '10%' }}
                        sx={formStyleCustom.default}>
                        <TextField
                            required
                            type='number'
                            defaultValue={item.Total}
                            // value={item.Total}
                            onChange={(e) => handleChange(index, 'Total', e.target.value)}
                            InputProps={{
                                style: {
                                    color: 'white',
                                    border: '2px solid #2C2C2C',
                                    backgroundColor: '#1A1C1E',
                                },
                            }}
                        />
                    </FormControl>
                </Box>
            })}
            <Box>
                <ButtonAtom config={buttonConfig} />
            </Box>
        </Box>
    );
}

export default FormRowInvoice;
