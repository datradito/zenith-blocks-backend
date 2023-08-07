import React, { useEffect } from 'react';
import useStyles from './index.style';
import { setInitialState, updateField } from '../../../actions/createBudgetAction';
import {
    Box,
    FormControl,
    TextField,
} from '@mui/material';
import generateUUID from '../../../Utility/uniqueId';
import { useDispatch, useSelector } from 'react-redux';
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
                // backgroundColor: '#2C2C2C',
                backgroundColor: 'black',
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
                color: "grey",
            }}>
                {/* Render the header data */}
                {tableHeaderData.map((item, index) => (
                    <FormControl key={index} sx={{
                        width: index === 0 ? '40%' : index === 1 || index === 2 ? '15%' : 'auto',
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
                                style={{ border: 'none', margin: '0.5rem'  }}
                                sx={formStyleCustom.default}
                            >
                                <TextField
                                    value={item.amount}
                                    type="number"
                                    max={filteredProposalAmount}
                                    onChange={(e) => handleChange(index, 'amount', e.target.value)}
                                    InputProps={{
                                        style: {
                                            color: 'white',
                                            border: '2px solid #2C2C2C',
                                            backgroundColor: '#1A1C1E',
                                            minWidth: '16%',
                                        },
                                    }}
                                    required
                                />
                            </FormControl>
                            <FormControl
                                style={{ width: '16%', border: 'none', padding: '0.5rem', mr: '0.5rem' }}
                                sx={formStyleCustom.default}
                            >
                                <CurrencyDropdown
                                    value={item.currency}
                                    onChange={(e) => handleChange(index, 'currency', e.target.value)}
                                />
                            </FormControl>
                            <FormControl
                                style={{ border: 'none', padding: '0.5rem', width: '22%' }}
                                sx={formStyleCustom.default}
                            >
                                <TextField
                                    fullWidth
                                    value={`${(parseInt(item.amount) / parseInt(filteredProposalAmount)) * 100}%`}
                                    InputProps={{
                                        style: {
                                            color: 'white',
                                            border: '2px solid #2C2C2C',
                                            backgroundColor: '#1A1C1E',
                                        },
                                        readOnly: true,
                                    }}
                                />
                            </FormControl>
                        </Box>
                    ))}
                </Box>
            )}
            {/* <Box>
                <ButtonAtom config={buttonConfig} />
            </Box> */}
        </Box>
    );
}

export default FormRow;


