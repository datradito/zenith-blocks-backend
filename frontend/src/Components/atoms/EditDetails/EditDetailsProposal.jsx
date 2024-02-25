import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import useSaveProposalDetails from "../../hooks/Proposals/useSetAmountProposal";
import { addAmount } from "../../../actions/currentProposal/amount";

import FormRow from "../FormRow/FormRow";
import Form from "../Form/Form";
import Button from "../Button/Button";
import CircularIndeterminate from "../Loader/loader";

import currencies from "../../../Utility/CurrencyList.json";
import StyledSelect from "../SelectDropdown/SelectDropdown";
import { InputBase } from "@mui/material";

export default function DetailPanelContent({ row, refetch }) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const { loading, saveProposalDetails } = useSaveProposalDetails();
  const methods = useForm();

  const onSubmit = async (data) => {
    try {
      await saveProposalDetails(
        data.amount,
        row,
        methods.getValues()?.currency
      );

      dispatch(
        addAmount({
          amount: data.amount,
          proposalId: row.id,
          status: "NotFilled",
        })
      );
      // onCloseModal();
      refetch({
        variables: {
          proposalid: row.id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <CircularIndeterminate />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={"modal"}>
      <FormRow label={`#${row.title}`} error={errors?.amount?.message}>
        <InputBase
          type="number"
          placeholder="Amount"
          inputProps={{ "aria-label": "Enter Proposal Amount" }}
          id="amount"
          name="amount"
          {...register("amount", {
            required: "Amount is required",
            min: {
              value: 0,
              message: "Amount must be greater than 0",
            },
          })}
        />
      </FormRow>
      <FormRow label="currency" error={errors?.currency?.message}>
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
  );
}
