import React, { useEffect } from 'react';
import useStyles from './index.style';
import { CryptoLogos, Select } from '@web3uikit/core';
import { setInitialState, addRow, deleteRow, updateField } from '../../../actions/createBudgetAction';
import {
    Box,
    Button,
    MenuItem,
    // Select,
    FormControl,
    TextField,
} from '@mui/material';
import generateUUID from '../../../Utility/uniqueId';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import { useDispatch, useSelector } from 'react-redux';
import ButtonAtom from '../../atoms/Button';
import UnstyledSelectBasic from '../../atoms/SelectDropdown/SelectDropdown';
import { categories } from '../../pages/Category/Category';
import CurrencyDropdown from '../../atoms/CurrencyDropdown/CurrencyDropdown';
import useFilteredProposalAmount from '../../hooks/useFilteredProposalAmount';

function FormRow({ tableHeaderData }) {
    const dispatch = useDispatch();
    let currentProposal = useSelector(state => state.currentProposal);
    const { proposals } = useSelector(state => state.currentProposalAmounts);
    let classes = useStyles();
    let { items, proposal } = useSelector(state => state.createBudget);

    const filteredProposalAmount = useFilteredProposalAmount(proposals, currentProposal.proposal.id);

    useEffect(() => {
        const setProposalData = async () => {
            const generatedBudgetId = generateUUID();
            const data = { proposal: currentProposal.proposal, id: generatedBudgetId };

            dispatch(setInitialState({ ...data, ...proposal, budget: filteredProposalAmount }));
        }
        setProposalData();
    }, [currentProposal.proposal.id]);


    const handleAddRow = async () => {
        //here confirm no empty fields
        const generatedBudgetId = generateUUID();
        dispatch(addRow({ action: '-', category: '', amount: '', currency: '', breakdown: '', id: generatedBudgetId }));
    };

    const handleDeleteRow = (index) => {
        dispatch(deleteRow(index));
    };

    const handleChange = (index, field, value) => {
        dispatch(updateField(
                index,
                field,
                value,
            ));
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
                // border: '2px solid #2C2C2C',
                backgroundColor: '#1A1C1E',
                margin: '0',
                fontSize: '.85rem',
            }
        },
        default: {
            color: 'white',
            padding: '0',

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
                        width: index === 0 ? '25px' : index === 1 ? '40%' : index === 2 || index === 3 ? '200px' : 'auto',
                        padding: '0.5rem'
                    }}>
                        {item}
                    </FormControl>
                ))}
            </Box>
            {items && (
                <Box>
                    {items.map((item, index) => (
                        <Box key={index}>
                            <FormControl
                                style={{
                                    border: 'none', padding: '0.5rem', width: '25px'
                                    //width: index === 0 ? '25px' : index === 1 ? '40%' : index === 2 || index === 3 ? '200px' : 'auto'
                                }}
                                sx={formStyleCustom.default}
                                required
                            >
                                <Button
                                    startIcon={<RemoveCircleOutlineSharpIcon />}
                                    onClick={() => handleDeleteRow(index)}
                                    sx={formStyleCustom.buttonStyles}
                                />
                            </FormControl>
                            <FormControl
                                style={{ width: '40%', border: 'none', padding: '0.5rem' }}
                                sx={formStyleCustom.default}
                            >
                                <UnstyledSelectBasic
                                    values={categories}
                                    defaultValue={item.category}
                                    onChange={(value) => handleChange(index, 'category', value)}
                                />
                            </FormControl>
                            <FormControl
                                style={{ border: 'none', padding: '0.5rem'  }}
                                sx={formStyleCustom.default}
                            >
                                <TextField
                                    value={item.amount}
                                    type="number"
                                    onChange={(e) => handleChange(index, 'amount', e.target.value)}
                                    InputProps={{
                                        style: {
                                            color: 'white',
                                            border: '2px solid #2C2C2C',
                                            backgroundColor: '#1A1C1E',
                                            minWidth: '200px',
                                        },
                                    }}
                                    required
                                />
                            </FormControl>
                            <FormControl
                                style={{ width: '200px', border: 'none', padding: '0.5rem' }}
                                sx={formStyleCustom.default}
                            >
                                <CurrencyDropdown
                                    value={item.currency}
                                    onChange={(e) => handleChange(index, 'currency', e.target.value)}
                                />
                                {/* <Select
                                    value={item.currency}
                                    onChange={(e) => handleChange(index, 'currency', e.target.value)}
                                    sx={[formStyleCustom.currencyDropdown, formStyleCustom.default]}
                                    style={{ fontSize: '.85rem' }}
                                >
                                    <MenuItem value="USD" color="primary">
                                        <CryptoLogos chain="usdt" />
                                    </MenuItem>
                                    <MenuItem value="EUR"> <CryptoLogos chain="ethereum" />ETH</MenuItem>
                                    <MenuItem value="GBP">GBP</MenuItem>
                                </Select> */}
{/*                            
                                <Select
                                    style={{ width: "2rem" }}
                                    defaultOptionIndex={0}
                                    onChange={(e) => handleChange(index, 'currency', e.value)}
                                    value={item.currency}
                                    options={[
                                        { value: "0x1", label: "ETH", id: "ETH", prefix: <CryptoLogos chain="ethereum" /> },
                                        { value: "0x89", label: "Matic", id: "Matic", prefix: <CryptoLogos chain="polygon" /> },
                                    ]}
                                /> */}
                            </FormControl>
                            <FormControl
                                style={{ border: 'none', padding: '0.5rem' }}
                                sx={formStyleCustom.default}
                            >
                                <TextField
                                    value={`${(parseInt(item.amount) / parseInt(filteredProposalAmount)) * 100}%`}
                                    //onChange={(e) => handleChange(index, 'Breakdown', (item["Allocated Budget"]/ 500))}
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
                            </FormControl>
                        </Box>
                    ))}
                </Box>
            )}
            <Box>
                <ButtonAtom config={buttonConfig} />
            </Box>
            {/* <InputAdornments /> */}
        </Box>
    );
}

export default FormRow;


