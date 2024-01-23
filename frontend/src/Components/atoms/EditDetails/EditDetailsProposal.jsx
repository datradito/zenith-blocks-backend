import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import useSaveProposalDetails from "../../hooks/Proposals/useSetAmountProposal";
import { addAmount } from "../../../actions/currentProposal/amount";

import Input from "../Input/Input";
import FormRow from "../FormRow/FormRow";
import Form from "../Form/Form";
import Button from "../Button/Button";
import CircularIndeterminate from "../Loader/loader";

import currencies from "../../../Utility/CurrencyList.json";
import StyledSelect from "../SelectDropdown/SelectDropdown";

export default function DetailPanelContent({ row, onCloseModal, refetch}) {
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
      await saveProposalDetails(data.amount, row, methods.getValues()?.currency);

      dispatch(
        addAmount({
          amount: data.amount,
          proposalId: row.id,
          status: "NotFilled",
        })
      );
      onCloseModal();
      refetch({
        variables: {
          proposalid: row.id,
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <CircularIndeterminate />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={"modal"}>
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
