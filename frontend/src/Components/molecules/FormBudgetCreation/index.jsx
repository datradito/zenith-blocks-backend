import React, { useEffect } from 'react';
import { setInitialState, updateField } from '../../../actions/createBudgetAction';
import {
    FormControl,
    Typography,
  TextField,
    Grid,
} from '@mui/material';
import generateUUID from '../../../Utility/uniqueId';
import { useDispatch, useSelector } from 'react-redux';
import UnstyledSelectBasic from '../../atoms/SelectDropdown/SelectDropdown';
import { categories } from '../../pages/Category/Category';
import CurrencyDropdown from '../../atoms/CurrencyDropdown/CurrencyDropdown';
import useFilteredProposalAmount from '../../hooks/Proposals/useFilteredProposalAmount';

const formStyleCustom = {
  columnLabel: {
    color: "grey",
    fontSize: "0.75rem",
  },
  currencyDropdown: {
    "& .MuiFormControl-root": {
      width: "20rem",
    },
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
      fontSize: ".85rem",
    },
  },
  default: {
    color: "white",
    padding: "0",

    "& .MuiInputBase-input": {
      padding: "0.5rem",
      fontSize: ".85rem",
    },
  },
  buttonStyles: {
    color: "white",
  },
  dividerRules: {
    color: "white",
    height: 28,
    m: 1,
    "& .MuiDivider-root": {
      backgroundColor: "white",
      color: "white",
    },
  },
};

function FormRow() {
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
    <Grid
      container
      sx={{
        width: '100%',
        margin: '1rem auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {items &&
        Object.entries(items[0]).map(([key, value], index) => {
          if (key !== 'id' && key !== 'remaining') {
            return (
              <Grid
                xs={index % 2 === 0 ? 3.5 : 2}
                key={index}
                sx={{
                  margin: "0 auto",
                  ...(key === "breakdown" && { marginRight: "0rem" }),
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    ...formStyleCustom.columnLabel,
                    ...(key === "category" && { paddingLeft: "0.5rem" }),
                  }}
                >
                  {key}
                </Typography>
                {key === "category" ? (
                  <FormControl
                    style={{
                      border: "none",
                      width: "100%",
                      paddingLeft: "0.5rem",
                    }}
                    sx={formStyleCustom.default}
                  >
                    <UnstyledSelectBasic
                      values={categories}
                      defaultValue={value}
                      onChange={(value) =>
                        handleChange(0, "category", value)
                      }
                    />
                  </FormControl>
                ) : key === "currency" ? (
                  <FormControl
                    style={{
                      width: "100%",
                      border: "none",
                    }}
                  >
                    <CurrencyDropdown
                      value={value}
                      onChange={(e) =>
                        handleChange(0, "currency", e.target.value)
                      }
                      InputProps={{
                        style: {
                          color: "red",
                          border: "1px solid #2C2C2C",
                          backgroundColor: "#24292E",
                        },
                      }}
                    />
                  </FormControl>
                ) : key === "breakdown" ? (
                  <FormControl
                    style={{ border: "none", width: "100%" }}
                    sx={formStyleCustom.default}
                  >
                    <TextField
                      sx={formStyleCustom.textFieldStyle}
                      value={`${
                        (parseInt(items[0]["amount"]) /
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
                ) : key === "amount" ? (
                  <FormControl
                    style={{ border: "none", width: "100%" }}
                    sx={formStyleCustom.default}
                  >
                    <TextField
                      value={items[0][index]}
                      type="number"
                      max={filteredProposalAmount}
                      onChange={(e) =>
                        handleChange(0, "amount", e.target.value)
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
                ) : null}
              </Grid>
            );
          }
          return null;
        })}
    </Grid>
  );
};

export default FormRow;
