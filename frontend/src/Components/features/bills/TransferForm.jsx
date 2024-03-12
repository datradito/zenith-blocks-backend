import React, { useEffect } from "react";
import Form from "../../atoms/Form/Form";
import { useFormContext } from "react-hook-form";
import FormRow from "../../atoms/FormRow/FormRow";
import Input from "../../atoms/Input/Input";
import Container from "../../atoms/Container/Container";
import SelectDropdown from "../../atoms/SelectDropdown/SelectDropdown";
import Option from "../../atoms/Option/Option";
import TextArea from "../../atoms/TextArea/TextArea";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Button } from "@mui/material";
import { ethers } from "ethers";
import { transferFunds } from "../../../services/Safe/transferFunds";
import useDashboardStore from "../../../store/modules/dashboard/index.ts";
import useAuthStore from "../../../store/modules/auth/index.ts";

function TransferForm({
  chain,
  erc20Balances,
  safeBalance,
  contacts,
  transactionService,
  ...props
}) {
  const categories = useDashboardStore((state) => state.categories);
  const {
    user: { address },
  } = useAuthStore();

  const currencies = JSON.parse(erc20Balances);

  const methods = useFormContext();
  const {
    formState: { errors, isDirty, touchedFields },
    watch,
    handleSubmit,
    register,
    setValue,
  } = methods;

  // useEffect(() => {
  //   if (!props?.budgetAmount) {
  //     console.log("setting currency");
  //     console.log(Object.values(currencies[0]));
  //     setValue(
  //       "currency",
  //       Object.values(currencies).length > 0
  //         ? Object.values(currencies)[0]
  //         : chain?.token
  //     );
  //   }
  // }, [currencies, setValue]);


  const handleBigInt = (key, value) =>
    typeof value === "bigint" ? value.toString() : value; // convert BigInt to string

  const selectedCurrencyBalance = watch("currency");
  const startDate = watch("date");

  const handleCurrencyChange = (e) => {
    console.log("this runs")
    if (e.target.value) {
      setValue("currency", e.target.value);
    } else {
      setValue("currency", JSON.stringify(currencies[0], handleBigInt));
    }

    console.log(selectedCurrencyBalance);
  }

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
        {/*
        assign category from budget if match is not /bills/misc make field read only
        */}
        <FormRow
          style={{
            flex: "1 1 30%",
          }}
          label="Category"
          error={errors?.category?.message}
        >
          <SelectDropdown
            id="category"
            {...register("category", {
              required: "* required",
            })}
            readOnly={props?.budgetAmount ? true : false}
            defaultValue={props?.budgetCategory || categories[0].name}
            onChange={(e) => setValue("category", e.target.value)}
          >
            {categories.map((category) => (
              <Option key={category.name} value={category.name}>
                {category.name}
              </Option>
            ))}
          </SelectDropdown>
        </FormRow>

        <FormRow
          style={{
            flex: "1 1 60%",
          }}
          label="Recipient"
          error={errors?.recipient?.message}
        >
          <SelectDropdown
            id="recipient"
            {...register("recipient", {
              required: "* required",
            })}
            defaultValue={contacts[0].to}
            onChange={(e) =>
              setValue("recipient", e.target.value) || contacts[0].to
            }
          >
            {contacts.length > 0 &&
              contacts.map((contact) => (
                <Option key={contact.to} value={contact.to}>
                  {contact.name || contact.to}
                </Option>
              ))}
          </SelectDropdown>
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
          <SelectDropdown
            id="currency"
            {...register("currency", {
              required: "* required",
            })}
            defaultValue={JSON.stringify(currencies[0], handleBigInt)}
            onChange={(e) => {
              handleCurrencyChange(e);
            }}
          >
            {Object.values(currencies).length > 0 ? (
              Object.values(currencies).map((currency) => {
                return (
                  <Option
                    key={JSON.stringify(currency.address, handleBigInt)}
                    value={JSON.stringify(currency, handleBigInt)}
                  >
                    {ethers.formatUnits(
                      currency.balance,
                      parseInt(currency.decimals)
                    )} 
                    {currency.symbol}
                  </Option>
                );
              })
            ) : (
              <Option key={chain?.token} value={chain?.token}>
                {ethers.formatEther(safeBalance || "0")} : {chain?.token}
              </Option>
            )}
          </SelectDropdown>
        </FormRow>
        <FormRow label="Amount" error={errors?.amount?.message}>
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
                if(!selectedCurrencyBalance) return true;
                const parsedValue = parseInt(value);

                const balance = JSON.parse(selectedCurrencyBalance).balance;
                const decimals = JSON.parse(selectedCurrencyBalance).decimals;
                const availableAmountForSelectedCurrency = parseInt(
                  ethers.formatUnits(
                    balance,
                    parseInt(decimals)
                  )
                );

                // If budgetAmount is defined and the entered value exceeds it, return an error
                if (
                  props?.budgetAmount &&
                  parsedValue > parseInt(props.budgetAmount)
                ) {
                  return "Amount exceeds remaining budget amount";
                }

                console.log(parsedValue > availableAmountForSelectedCurrency);

                // If the entered value exceeds the available amount for the selected currency, return an error
                if (parsedValue > availableAmountForSelectedCurrency) {
                  return "Exceeds available balance";
                }

                // If none of the above conditions are met, the value is valid
                return true;
              },
            })}
            onChange={(e) => setValue("amount", e.target.value)}
          />
        </FormRow>

        <FormRow label="Date">
          <Input
            style={{
              flex: "1 1 50%",
            }}
            type="date"
            id="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            {...register("date")}
          />
        </FormRow>
        <FormRow
          style={{
            flex: "1 1 50%",
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
