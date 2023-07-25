import React, { useEffect } from 'react';
import useStyles from './index.style';
import { setInitialState, addRow, deleteRow, updateField } from '../../../actions/createBudgetAction';
import {
    Box,
    Button,
    MenuItem,
    Select,
    FormControl,
    TextField,
} from '@mui/material';
import generateUUID from '../../../Utility/uniqueId';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import { useDispatch, useSelector } from 'react-redux';
import ButtonAtom from '../../atoms/Button';
import UnstyledSelectBasic from '../../atoms/SelectDropdown/SelectDropdown';
import { categories } from '../../pages/Category/Category';

function FormRow({ tableHeaderData }) {
    const dispatch = useDispatch();
    let currentProposal = useSelector(state => state.currentProposal);
    let classes = useStyles();
    let { items, proposal } = useSelector(state => state.createBudget);

    //Todo: Implement Proposal amount - allocated budget validation so that total budget amount does not exceed the total proposal amount
    //Todo: Fix setting proposal correctly in initial state, implement hash funciton in store to generate unique id for each budget

    useEffect(() => {
        const setProposalData = async () => {
            const generatedBudgetId = generateUUID();
            const data = { proposal: currentProposal.proposal, id: generatedBudgetId };
            dispatch(setInitialState(data));
        }
        setProposalData();
    }, []);


    const handleAddRow = async () => {
        //here confirm no empty fields
        const generatedBudgetId = generateUUID();
        dispatch(addRow({ action: '-', Categories: '', "Allocated Budget": '', Currency: '', Breakdown: '', id: generatedBudgetId }));
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
                                    onChange={(value) => handleChange(index, 'Categories', value)}
                                />
                            </FormControl>
                            <FormControl
                                style={{ border: 'none', padding: '0.5rem'  }}
                                sx={formStyleCustom.default}
                            >
                                <TextField
                                    value={item['Allocated Budget']}
                                    type="number"
                                    onChange={(e) => handleChange(index, 'Allocated Budget', e.target.value)}
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
                                <Select
                                    value={item.Currency}
                                    onChange={(e) => handleChange(index, 'Currency', e.target.value)}
                                    sx={[formStyleCustom.currencyDropdown, formStyleCustom.default]}
                                    style={{ fontSize: '.85rem' }}
                                >
                                    <MenuItem value="USD" color="primary">
                                        USD
                                    </MenuItem>
                                    <MenuItem value="EUR">EUR</MenuItem>
                                    <MenuItem value="GBP">GBP</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl
                                style={{ border: 'none', padding: '0.5rem' }}
                                sx={formStyleCustom.default}
                            >
                                <TextField
                                    value={`${(item['Allocated Budget'] / 500) * 100}%`}
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


