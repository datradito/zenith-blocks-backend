import React from "react";
import { useForm } from "react-hook-form";

import useSaveProposalDetails from "../../hooks/Proposals/useSetAmountProposal";

import FormRow from "../FormRow/FormRow";
import Form from "../Form/Form";
import CircularIndeterminate from "../Loader/loader";

//Todo: move this currenys list to somewhere more relevant
import currencies from "../../../utils/CurrencyList.json";
import StyledSelect from "../SelectDropdown/SelectDropdown";
import Input from "../Input/Input";

import { Button } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
export default function DetailPanelContent({ row, refetch }) {

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
        <Input
          type="number"
          placeholder="Amount"
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
      <Button
        sx={{
          width: "40%",
          height: "2rem",
          "&:hover": {
            backgroundColor: "#E0E0E0",
          },
        }}
        type="submit"
        variant="outlined"
        endIcon={<ArrowCircleRightIcon />}
      >
        Submit
      </Button>
    </Form>
  );
}
