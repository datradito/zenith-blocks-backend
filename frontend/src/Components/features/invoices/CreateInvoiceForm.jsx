import { useFormContext } from "react-hook-form";
import TextArea from "../../atoms/TextArea/TextArea";
import Form from "../../atoms/Form/Form";
import FormRow from "../../atoms/FormRow/FormRow";
import Input from "../../atoms/Input/Input";
import FileUpload from "../../atoms/FileUpload/FileUpload";
import Container from "../../atoms/Container/Container";
import { Typography } from "@mui/material";

function CreateInvoiceForm({ remainingBudgetAmount }) {
  const methods = useFormContext();

  const { errors, defaultValues } = methods.formState;

  return (
    <Container
      style={{
        border: "none",
      }}
    >
      <Typography
        variant="subtitle1"
        style={{
          color: "cream",
          width: "100%",
          textAlign: "left",
          marginLeft: "2rem",
        }}
      >
        Invoice #
      </Typography>
      <Form
        style={{
          border: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Container
          style={{
            border: "none",
            margin: "2rem",
            width: "100%",
            display: "flex",
            gap: "1rem",
          }}
        >
          <FormRow
            style={{
              minWidth: "70%",
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
          <FormRow label="Category" error={errors?.category?.message}>
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
        </Container>

        <Typography
          variant="subtitle1"
          style={{
            color: "cream",
            width: "100%",
            textAlign: "left",
            marginLeft: "2rem",
          }}
        >
          Invoice Details
        </Typography>
        <Container
          style={{
            border: "none",
            display: "flex",
            margin: "2rem",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignContent: "stretch",
            gap: "1rem",
          }}
        >
          <FormRow
            style={{
              minWidth: "57%",
            }}
            label="Recipient"
            error={errors?.recipient?.message}
          >
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
              flex: 1,
            }}
            label="Invoice #"
            error={errors?.invoiceNumber?.message}
          >
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
              maxWidth: "20%",
            }}
            label="Currency"
            error={errors?.currency?.message}
          >
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

          <FormRow
            style={{
              minWidth: "34%",
            }}
            label="Date"
          >
            <Input
              type="date"
              id="date"
              value={defaultValues["date"]}
              {...methods.register("date")}
            />
          </FormRow>
          <FormRow
            style={{
              flex: "35% 1 1",
            }}
            label="Due Date"
            error={errors?.dueDate?.message} // Include the error message
          >
            <Input
              type="date"
              id="dueDate"
              {...methods.register("dueDate", {
                required: "This field is required",
                validate: (value) => {
                  const selectedDate = new Date(defaultValues["date"]);
                  const dueDate = new Date(value);

                  return dueDate <= selectedDate
                    ? "Due Date must be after the Date"
                    : undefined;
                },
              })}
            />
          </FormRow>
          <FormRow
            style={{
              flex: 1,
            }}
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
              flex: "50% 1 1",
            }}
            label="Description"
            error={errors?.description?.message}
          >
            <TextArea
              type="text"
              id="description"
              {...methods.register("description", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow
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
          </FormRow>
        </Container>
      </Form>
    </Container>
  );
}

export default CreateInvoiceForm;
