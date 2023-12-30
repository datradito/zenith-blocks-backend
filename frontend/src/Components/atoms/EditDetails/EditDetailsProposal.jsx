import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";

import useSaveProposalDetails from '../../hooks/Proposals/useSetAmountProposal';
import { addAmount } from '../../../actions/currentProposal/amount';

import Input from '../Input/Input';
import Container from '../Container/Container';
import FormRow from '../FormRow/FormRow';
import Form from '../Form/Form';
import Button from "../Button/Button";
import CircularIndeterminate from "../Loader/loader";

import currencies from "../../../Utility/CurrencyList.json";
import StyledSelect from "../SelectDropdown/SelectDropdown";


let dialogContainerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  backgroundColor: ("#1a1c1e", 0.9), // Make the dialog modal look darker
  alignItems: "center",
  zIndex: 9999,
  boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)", // Set a high z-index value to make sure it overlays other content
};

let dialogContentStyle = {
  // width: "400px",
  backgroundColor: "#0D0E10",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
  padding: "1.5rem",

};

export default function DetailPanelContent({ row, setIsAmountAdded}) {
  const dispatch = useDispatch();
  const {handleSubmit, formState: { errors }, register } = useForm();
  const { loading, saveProposalDetails } = useSaveProposalDetails();
  const [dialogOpen, setDialogOpen] = useState(true);

  const methods = useForm();

  const onSubmit = async (data) => {
    try {
      await saveProposalDetails(data.amount, row);

      dispatch(
        addAmount({
          amount: data.amount,
          proposalId: row.id,
          status: "NotFilled",
        })
      );
      setIsAmountAdded(true);
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

    if (loading) return <CircularIndeterminate />;

  return (
    <Container
      style={{ ...dialogContainerStyle, display: dialogOpen ? "flex" : "none" }}
    >
      <Container style={dialogContentStyle}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow label={`#${row.title}`} error={errors?.amount?.message}>
            <Input
              type="number"
              id="amount"
              name="amount"
              {...register("amount", {
                required: "Amount is required",
              })}
            />
          </FormRow>
          <FormRow label="Currency" error={errors?.currency?.message}>
            <StyledSelect
              {...methods.register("currency", {
                required: "This field is required",
              })}
              onChange={(e) => methods.setValue("currency", e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency.ticker} value={currency.ticker}>
                  {currency.ticker}
                </option>
              ))}
            </StyledSelect>
          </FormRow>
          <Button>Save</Button>
        </Form>
      </Container>
    </Container>
  );
}
