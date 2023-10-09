import { useFormContext } from "react-hook-form";

import { categories, currencies } from "../../pages/Category/Category";

import TextArea from "../../atoms/TextArea/TextArea";
import StyledSelect from "../../atoms/SelectDropdown/SelectDropdown";
import Form from "../../atoms/Form/Form";
import FormRow from "../../atoms/FormRow/FormRow";
import Input from "../../atoms/Input/Input";
import FileUpload from "../../atoms/FileUpload/FileUpload";
import Option from "../../atoms/Option/Option";
import Container from "../../atoms/Container/Container";
import { Typography } from "@mui/material";

function CreateInvoiceForm() {
  const methods = useFormContext();
  const { errors, defaultValues } = methods.formState;

  return (
    <Container
      style={{
        border: "none",
        // margin: "2rem",
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
            <StyledSelect
              {...methods.register("category", {
                required: "This field is required",
              })}
              onChange={(e) => methods.setValue("category", e.target.value)}
            >
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </StyledSelect>
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
              maxWidth: "20%",
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
            <StyledSelect
              {...methods.register("currency", {
                required: "This field is required",
              })}
              onChange={(e) => methods.setValue("currency", e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </StyledSelect>
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
              minWidth: "37%",
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
          <FormRow label="Amount" error={errors?.amount?.message}>
            <Input
              type="number"
              id="amount"
              {...methods.register("amount", {
                max: {
                  value: defaultValues["Total Budget"],
                  message: "Amount cannot be greater than Total Budget",
                },
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow
            style={{
              minWidth: "50%",
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
              minWidth: "48%",
              minHeight: "5rem",
            }}
            label="File Upload"
            error={errors?.description?.message}
          >
            <FileUpload
              style={{
                minHeight: "5rem",
              }}
              type="file"
              id="invoicepdf"
              {...methods.register("invoicepdf")}
            >
              </FileUpload>
          </FormRow>
        </Container>
      </Form>
    </Container>
  );
}

export default CreateInvoiceForm;
