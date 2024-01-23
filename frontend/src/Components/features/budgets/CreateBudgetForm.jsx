import { useFormContext } from "react-hook-form";

import { categories } from "../../pages/Category/Category";

import TextArea from "../../atoms/TextArea/TextArea";
import Form from "../../atoms/Form/Form";
import FormRow from "../../atoms/FormRow/FormRow";
import Input from "../../atoms/Input/Input";
import Option from "../../atoms/Option/Option";
import Container from "../../atoms/Container/Container";
import SelectDropdown from "../../atoms/SelectDropdown/SelectDropdown";

function CreateBudgetForm({remainingProposalAmount}) {
  const methods = useFormContext();
  const { errors, defaultValues } = methods.formState;
  return (
    <Container
      style={{
        border: "none",
        margin: "2rem",
      }}
    >
      <Form>
        <FormRow label="Goverance" error={errors?.goverance?.message}>
          <Input
            type="text"
            id="goverance"
            defaultValue={defaultValues.Goverance}
            readOnly
            {...methods.register("goverance")}
          />
        </FormRow>
        <FormRow label="Proposal">
          <Input
            type="text"
            id="proposal"
            readOnly
            defaultValue={defaultValues.Proposal}
            {...methods.register("proposal")}
          />
        </FormRow>
        <FormRow label="IPFS Link">
          <Input
            type="link"
            id="ipfsLink"
            readOnly
            defaultValue={defaultValues["Ipfs Link"]}
            {...methods.register("ipfsLink")}
          />
        </FormRow>
        <FormRow label="Category" error={errors?.category?.message}>
          <SelectDropdown
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
          </SelectDropdown>
        </FormRow>
        <FormRow label="Total Budget">
          <Input
            type="number"
            id="totalBudget"
            readOnly
            defaultValue={defaultValues["Total Budget"]}
            {...methods.register("totalBudget")}
          />
        </FormRow>
        <FormRow label="Amount" error={errors?.amount?.message}>
          <Input
            type="number"
            id="amount"
            {...methods.register("amount", {
              max: {
                value: remainingProposalAmount,
                message: `Amount cannot be greater than ${remainingProposalAmount} remaining in proposal`,
              },
              min: {
                value: 0,
                message: "Amount cannot be negative",
              },
              required: "This field is required",
              onChange: (e) => {
                methods.setValue(
                  "breakdown",
                  `${(
                    (parseInt(e.target.value) /
                      parseInt(defaultValues["Total Budget"])) *
                    100
                  ).toFixed(2)}%`
                );
              },
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
        <FormRow label="Breakdown">
          <Input
            type="text"
            id="breakdown"
            readOnly
            defaultValue={defaultValues.Breakdown}
            {...methods.register("breakdown", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow label="Description" error={errors?.description?.message}>
          <TextArea
            type="text"
            id="description"
            {...methods.register("description", {
              required: "This field is required",
            })}
          />
        </FormRow>
      </Form>
    </Container>
  );
}

export default CreateBudgetForm;
