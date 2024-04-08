import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import useSaveProposalDetails from "../../hooks/Proposals/useSetAmountProposal";

import FormRow from "../../atoms/FormRow/FormRow";
import Form from "../../atoms/Form/Form";
import CircularIndeterminate from "../../atoms/Loader/loader";
import FormSelectDropdown from "../../molecules/Form/FormSelectDropdown";

import Input from "../../atoms/Input/Input";

import { Button } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import { getSafeDataForForms } from "../../../Services/Safe/getSafeDataForForms";

const { currencies } = getSafeDataForForms();

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
        methods.getValues()?.currency.name
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
    <FormProvider {...methods}>
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
        <FormSelectDropdown
          name="currency"
          options={currencies}
          register={register}
        />
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
    </FormProvider>
  );
}
