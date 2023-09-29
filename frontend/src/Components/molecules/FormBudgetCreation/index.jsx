import React, { useEffect } from 'react';
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
import Divider from '@mui/material/Divider';
import useFilteredProposalAmount from '../../hooks/Proposals/useFilteredProposalAmount';

const formStyleCustom = {
    columnWidth: {
        currency: {
            width: '15%',
        },
        category: {
            width: '40%',
        },
        amount: {
            width: '15%',
        },
        breakdown: {
            width: 'auto',
        },
    },
  currencyDropdown: {
    "& .MuiTableCell-root": {
      color: "white",
      backgroundColor: "#24292E",
      fontSize: "0.85rem",
    },
    "& .MuiInputBase-root": {
      fontSize: ".85rem",
    },
    "& .MuiSelect-root": {
      fontSize: ".85rem",
    },
    "& .MuiSvgIcon-root": {
      color: "white",
    },
    },
  textFieldStyle: {
    "& .MuiInputBase-root": {
      color: "white",
      backgroundColor: "#24292E",
      margin: "0",
      fontSize: ".85rem",
    },
  },
  default: {
    color: "white",
    padding: "0",

    "& .MuiInputBase-input": {
      padding: "0.5rem",
      fontSize: ".85rem",
    }
  },
  buttonStyles: {
    color: "white",
  },
  dividerRules: {
    color: "white",
    height: 28,
    m: 1,
    "& .MuiDivider-root": {
        backgroundColor: 'white',
        color: 'white',
    }
  },
};

function FormRow({ tableHeaderData }) {
    const dispatch = useDispatch();
    let currentProposal = useSelector(state => state.currentProposal);
    const { proposals } = useSelector(state => state.currentProposalAmounts);
    let { items, proposal } = useSelector(state => state.createBudget);

    const filteredProposalAmount = useFilteredProposalAmount(proposals, currentProposal.proposal.id);

    useEffect(() => {
        const setProposalData = async () => {
            const generatedBudgetId = generateUUID();
            const data = { proposal: currentProposal.proposal, id: generatedBudgetId };

            dispatch(setInitialState({ ...data, ...proposal, budget: filteredProposalAmount }));
        }
        setProposalData();
    }, []);

    const handleChange = (index, field, value) => {
        dispatch(updateField(
            index,
            field,
            value,
        ));
    };

    return (
      <Box
        sx={{
          width: "98%",
          marginLeft: "2%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            margin: ".5rem auto",
            display: "flex",
            justifyContent: "flex-start",
            border: "none",
            padding: "0.1rem",
            fontSize: "0.75rem",
            marginTop: "2rem",
            color: "grey",
          }}
        >
          {/* Render the header data */}
          {tableHeaderData.map((item, index) => (
            <>
              <FormControl
                key={index}
                sx={{
                  width: formStyleCustom.columnWidth[item.toLowerCase()],
                  padding: "0.5rem",
                  paddingBottom: "0rem",
                }}
              >
                {item}
              </FormControl>
              {/* <Divider
                sx={formStyleCustom.dividerRules}
                orientation="vertical"
              /> */}
            </>
          ))}
        </Box>
        {items && (
          <Box>
            {items.map((item, index) => (
              <Box key={index}>
                <FormControl
                  style={{ width: "40%", border: "none", padding: "0.5rem" }}
                  sx={formStyleCustom.default}
                >
                  <UnstyledSelectBasic
                    values={categories}
                    defaultValue={item.category}
                    onChange={(value) => handleChange(index, "category", value)}
                  />
                </FormControl>
                <FormControl
                  style={{
                    width: "15%",
                    border: "none",
                    margin: "0.5rem",
                  }}
                  sx={formStyleCustom.default}
                >
                  <TextField
                    value={item.amount}
                    type="number"
                    max={filteredProposalAmount}
                    onChange={(e) =>
                      handleChange(index, "amount", e.target.value)
                    }
                    InputProps={{
                      style: {
                        color: "white",
                        border: "1px solid #2C2C2C",
                        backgroundColor: "#24292E",
                      },
                    }}
                    required
                  />
                </FormControl>
                <FormControl
                  style={{
                    width: '12rem',
                    border: "none",
                    padding: "0.5rem",
                    mr: "0.5rem",
                  }}
                  sx={formStyleCustom.default}
                >
                <CurrencyDropdown
                    sx={{width: '100%'}}
                    value={item.currency}
                    onChange={(e) =>
                      handleChange(index, "currency", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl
                    style={{
                    width: `calc(100% - 76% )`,
                    border: "none",
                    padding: "0.5rem",
                  }}
                  sx={formStyleCustom.default}
                >
                  <TextField
                    sx={formStyleCustom.textFieldStyle}
                    value={`${
                      (parseInt(item.amount) /
                        parseInt(filteredProposalAmount)) *
                      100
                    }%`}
                    InputProps={{
                      style: {
                        color: "white",
                        border: "1px solid #2C2C2C",
                      },
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    );
}

export default FormRow;


