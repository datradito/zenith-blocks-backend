import React from "react";
import Form from "../../atoms/Form/Form";
import FormRow from "../../atoms/FormRow/FormRow";
import Input from "../../atoms/Input/Input";

import Stack from "@mui/material/Stack";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@mui/material";
import Switch from "@mui/material/Switch";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import FormSelectDropdown from "../../molecules/Form/FormSelectDropdown.jsx";

import { FREQUENCY_OPTIONS } from "../../../utils/constants/frequency.js";
import { message } from "antd";

function BillRecurr({ invoice, onCloseModal }) {
  const {
    register,
    formState: { defaultValues },
    handleSubmit,
    watch,
    control,
  } = useForm({
    defaultValues: {
      id: invoice?.InvoiceId,
      Amount: invoice?.Amount,
      Category: invoice?.Category,
      RecipientAddress: invoice?.RecipientAddress,
      Recurring: invoice?.Recurring,
    },
  });

  const recurringChecked = watch("recurring");

  const onSubmit = (data) => {
    message.loading({
      content: "Submitting...",
      key: "submit",
    });

    try {
      console.log(data);

      //simulate 2 seconds of delay here
      setTimeout(() => {
        console.log("Submitted");
        message.success({
          content: "Submitted successfully",
          key: "submit",
        });
        onCloseModal();
        message.destroy("submit");
      }, 2000);
    } catch (error) {
      message.error({
        content: "Error submitting",
        key: "submit",
      });
    } finally {
      onCloseModal();
      message.destroy("submit");
    }
  };

  const handleRecurringChange = (e) => {
    const status = e.target.checked;

    if (status) {
      message.info("Recurring is enabled");
    } else {
      message.warning("Recurring is disabled");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={2}
        width="30rem"
        style={{
          justifyContent: "space-between",
          margin: "1rem",
          padding: "1rem",
        }}
      >
        <div
          style={{
            alignSelf: "flex-end",
          }}
        >
          <Controller
            name="recurring"
            control={control}
            defaultValue={defaultValues?.Recurring}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={(e) =>
                  field.onChange(!field.value) && handleRecurringChange(e)
                }
                inputProps={{ "aria-label": "controlled" }}
              />
            )}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <FormSelectDropdown
            name="Frequency"
            control={control}
            disabled={!recurringChecked} // Disable dropdown if recurring is not checked
            rules={{
              required: "Frequency is required",
              validate: (value) => {
                console.log(recurringChecked);
                //if switch is not checked disable this field and set error
                if (!recurringChecked) {
                  return "Recurring must be checked to choose frequency";
                }
              },
            }}
            options={FREQUENCY_OPTIONS}
            register={register}
          />
          <FormRow
            style={{
              flex: "1 1 30%",
            }}
            label="Amount"
            error={invoice?.errors?.Amount}
          >
            <Input
              name="Amount"
              placeholder="0.00"
              defaultValue={defaultValues?.Amount}
              type="number"
            />
          </FormRow>
          <FormRow
            style={{
              flex: "1 1 30%",
            }}
            label="Category"
            error={invoice?.errors?.Category}
          >
            <Input
              name="Category"
              defaultValue={defaultValues?.Category}
              readOnly
            />
          </FormRow>
          <FormRow
            style={{
              flex: "1 1 30%",
            }}
            label="Recipient"
            error={invoice?.errors?.RecipientAddress}
          >
            <Input
              name="RecipientAddress"
              placeholder="0x..."
              defaultValue={defaultValues?.RecipientAddress}
              readOnly
            />
          </FormRow>
        </div>
        <Button
          sx={{
            width: "6rem",
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
      </Stack>
    </Form>
  );
}

export default BillRecurr;
