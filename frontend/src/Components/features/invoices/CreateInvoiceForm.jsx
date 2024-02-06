import { useFormContext } from "react-hook-form";
import TextArea from "../../atoms/TextArea/TextArea";
import Form from "../../atoms/Form/Form";
import FormRow from "../../atoms/FormRow/FormRow";
import Input from "../../atoms/Input/Input";
import FileUpload from "../../atoms/FileUpload/FileUpload";
import Container from "../../atoms/Container/Container";
import { Typography, Grid } from "@mui/material";

function CreateInvoiceForm({ remainingBudgetAmount }) {
  const methods = useFormContext();

  const { errors, defaultValues } = methods.formState;

  return (
    <Container
      style={{
        width: "100%",
      }}
    >
      <Typography
        variant="h6"
        style={{
          textAlign: "left",
          margin: "2rem",
        }}
      >
        Bill #
      </Typography>
      <Form
        style={{
          border: "none",
          display: "flex",
        }}
      >
        <Grid container direction="row" margin={4} gap={2}>
          <FormRow
            style={{
              flex: 2,
            }}
            label="Proposal"
          >
            <Input
              type="text"
              id="proposal"
              readOnly
              defaultValue={defaultValues.Proposal}
              {...methods.register("proposal")}
            />
          </FormRow>
          <FormRow
            style={{
              flex: 1,
            }}
            label="Category"
            error={errors?.category?.message}
          >
            <Input
              type="text"
              id="category"
              readOnly
              value={defaultValues.Category}
              {...methods.register("category", {
                required: "Category is required",
              })}
            />
          </FormRow>
        </Grid>

        <Typography
          variant="h6"
          style={{
            textAlign: "left",
            marginLeft: "2rem",
          }}
        >
          Bill Details
        </Typography>
        <Grid container direction="row" margin={4} gap={2}>
          <FormRow
            style={{
              flex: "1 1 40%",
            }}
            label="Recipient" error={errors?.recipient?.message}>
            <Input
              type="text"
              id="recipient"
              {...methods.register("recipient", {
                required: "Reciepient is required",
              })}
            />
          </FormRow>
          <FormRow
            style={{
              flex: "1 1 20%",
            }}
            label="Bill #" error={errors?.invoiceNumber?.message}>
            <Input
              type="text"
              id="invoiceNumber"
              {...methods.register("invoiceNumber", {
                required: "Number is required",
              })}
            />
          </FormRow>
          <FormRow
            style={{
              flex: "auto",
            }}
            label="Currency" error={errors?.currency?.message}>
            <Input
              type="text"
              id="currency"
              readOnly
              value={defaultValues.Currency}
              {...methods.register("currency", {
                required: "Currency is required",
              })}
            />
          </FormRow>

          <FormRow label="Date">
            <Input
              type="date"
              id="date"
              value={defaultValues["date"]}
              {...methods.register("date")}
            />
          </FormRow>
          <FormRow
            label="Due Date"
            error={errors?.dueDate?.message} // Include the error message
          >
            <Input
              type="date"
              id="dueDate"
              {...methods.register("dueDate", {
                required: "This field is required",
                validate: (value) => {
                  const selectedDate = new Date(value["date"]);
                  const dueDate = new Date(value);

                  return dueDate <= selectedDate
                    ? "Due Date must be after the Date"
                    : undefined;
                },
              })}
            />
          </FormRow>
          <FormRow
            label="Amount"
            error={errors?.amount?.message}
          >
            <Input
              type="number"
              id="amount"
              defaultValue={defaultValues.Amount}
              {...methods.register("amount", {
                max: {
                  value: remainingBudgetAmount || defaultValues["amount"],
                  message: `Amount cannot be greater than ${remainingBudgetAmount} remaining in budget`,
                },
                min: {
                  value: 0,
                  message: "Amount cannot be negative",
                },
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow
            style={{
              flex: 1,
            }}
            label="Description" error={errors?.description?.message}>
            <TextArea
              type="text"
              id="description"
              {...methods.register("description", {
                required: "This field is required",
              })}
            />
          </FormRow>
          {/* <FormRow
            style={{
              flex: 1,
              minHeight: "5rem",
            }}
            label="File Upload"
            error={errors?.description?.message}
          >
            <FileUpload
              style={{
                minHeight: "5rem",
              }}
              accept="image/*"
              id="invoicepdf"
              {...methods.register("invoicepdf")}
            ></FileUpload>
          </FormRow> */}
        </Grid>
      </Form>
    </Container>
  );
}

export default CreateInvoiceForm;
