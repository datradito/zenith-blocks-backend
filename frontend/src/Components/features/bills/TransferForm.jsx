import React from "react";
import Form from "../../atoms/Form/Form";
import { useFormContext } from "react-hook-form";
import FormRow from "../../atoms/FormRow/FormRow";
import Input from "../../atoms/Input/Input";
import Container from "../../atoms/Container/Container";
import TextArea from "../../atoms/TextArea/TextArea";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Button } from "@mui/material";
import { transferFunds } from "../../../Services/Safe/transferFunds";
import useAuthStore from "../../../store/modules/auth/index.ts";
import useSafeTransaction from "../../hooks/Safe/useSafeTransaction";
import ControlledDropdown from "../../molecules/Bills/ListDropdown.jsx";

import { isAddressValid } from "../../../utils/logical/isAddressValid.js";

function TransferForm({
  ...props
}) {
    const transactionService = useSafeTransaction();
  const {
    user: { address },
  } = useAuthStore();


  const methods = useFormContext();
  const {
    formState: { errors, isDirty, defaultValues },
    watch,
    handleSubmit,
    register,
    setValue,
  } = methods;


  const selectedCurrencyBalance = watch("currency");
  const startDate = watch("date");


  return (
    <Container padding={4}>
      <Form
        onSubmit={handleSubmit((data) => {
          try {
            if (props?.handleSubmit) {
              props.handleSubmit(data);
            }
            // transferFunds([data], transactionService, address);
          } catch (e) {
            console.error(e);
          }
        })}
      >
        <FormRow
          style={{
            flex: "1 1 30%",
          }}
          label="Category"
          error={errors?.category?.message}
        >
          <ControlledDropdown
            name="category"
            options={props?.formData.categories}
            readOnly={props?.budgetAmount ? true : false}
          />
        </FormRow>
        <FormRow
          style={{
            flex: "1 1 30%",
          }}
          label="Recipient"
          error={errors?.recipient?.message}
        >
          {props?.formData.contacts && props?.formData.contacts.length > 0 ? (
            <ControlledDropdown
              name="recipient"
              options={props?.formData.contacts}
            />
          ) : (
            <Input
              type="text"
              placeholder="Recipient"
              inputProps={{ "aria-label": "Enter Address" }}
              id="Recipient"
              name="Recipient"
              {...register("Recipient", {
                required: "Recipient is required",
                validate: (value) => {
                  return isAddressValid(value);
                },
              })}
            />
          )}
        </FormRow>

        <FormRow
          style={{
            flex: "1 1 20%",
          }}
          label="Bill #"
          error={errors?.invoiceNumber?.message}
        >
          <Input
            type="text"
            id="invoiceNumber"
            {...register("invoiceNumber", {
              required: "* required",
            })}
          />
        </FormRow>
        <FormRow
          style={{
            flex: "1 1 20%",
          }}
          label="Currency"
          error={errors?.currency?.message}
        >
          <ControlledDropdown
            name="currency"
            options={props?.formData.currencies}
          />
        </FormRow>

        {/* <FormRow
              <Option key={chain?.token} value={chain?.token}>
                {ethers.formatEther(safeBalance || "0")} : {chain?.token}
              </Option>
        </FormRow> */}
        <FormRow
          style={{
            flex: "1 1 10%",
          }}
          label="Amount" error={errors?.amount?.message}>
          <Input
            type="number"
            id="amount"
            {...register("amount", {
              required: "* required",
              min: {
                value: 0,
                message: "Amount must be greater than 0",
              },
              validate: (value) => {
                const parsedValue = parseInt(value);
                const balance = parseInt(selectedCurrencyBalance.balance);

                console.log(parsedValue, balance);
                if (
                  props?.budgetAmount &&
                  parsedValue > parseInt(props.budgetAmount)
                ) {
                  return "Amount exceeds remaining budget amount";
                }

                console.log(parsedValue > balance);

                if (parsedValue > balance) {
                  return "Exceeds available balance";
                }

                return true;
              },
            })}
            onChange={(e) => setValue("amount", e.target.value)}
          />
        </FormRow>

        <FormRow label="Date">
          <Input
            style={{
              flex: "1 1 40%",
            }}
            type="date"
            id="date"
            {...register("date")}
          />
        </FormRow>
        <FormRow
          style={{
            flex: "1 1 40%",
          }}
          label="Due Date"
          error={errors?.dueDate?.message}
        >
          <Input
            type="date"
            id="dueDate"
            {...register("dueDate", {
              required: "* required",
              validate: (value) => {
                const selectedDate = new Date(startDate);
                const dueDate = new Date(value);
                return dueDate <= selectedDate
                  ? "Due Date must be after the Creation Date"
                  : undefined;
              },
            })}
          />
        </FormRow>
        <FormRow
          style={{
            flex: "1 1 100%",
          }}
          label="Description"
          error={errors?.description?.message}
        >
          <TextArea type="text" id="description" />
        </FormRow>
        <Button
          sx={{
            widht: "2rem",
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
    </Container>
  );
}

export default TransferForm;
