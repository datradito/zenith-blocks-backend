import { useFormContext } from "react-hook-form";

import { categories } from "../../pages/Category/Category";

import TextArea from "../../atoms/TextArea/TextArea";
import Form from "../../atoms/Form/Form";
import FormRow from "../../atoms/FormRow/FormRow";
import Input from "../../atoms/Input/Input";
import Option from "../../atoms/Option/Option";
import Container from "../../atoms/Container/Container";
import SelectDropdown from "../../atoms/SelectDropdown/SelectDropdown";

function CreateBudgetForm() {
  const methods = useFormContext();
  const { errors, defaultValues } = methods.formState;

  console.log(defaultValues)

  return (
    <Container padding={4}>
      <Form>
        <FormRow
          style={{
            flex: "1 1 50%",
          }}
          label="Goverance"
          error={errors?.goverance?.message}
        >
          <Input
            type="text"
            id="goverance"
            defaultValue={defaultValues.Goverance}
            readOnly
            {...methods.register("goverance")}
          />
        </FormRow>
        <FormRow
          style={{
            flex: "1 1 40%",
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
            flex: "1 1 40%",
          }}
          label="IPFS Link"
        >
          <Input
            type="link"
            id="ipfsLink"
            readOnly
            defaultValue={defaultValues["Ipfs Link"]}
            {...methods.register("ipfsLink")}
          />
        </FormRow>
        <FormRow
          style={{
            flex: "1 1 20%",
          }}
          label="Category"
          error={errors?.category?.message}
        >
          <SelectDropdown
            id="category"
            {...methods.register("category", {
              required: "This field is required",
            })}
            onChange={(e) =>
              methods.setValue("category", e.target.value || categories[0])
            }
          >
            {categories.map((category) => (
              <Option
                // defaultValue={categories[0]}
                key={category}
                value={category}
              >
                {category}
              </Option>
            ))}
          </SelectDropdown>
        </FormRow>
        <FormRow
          style={{
            flex: "1 1 30%",
          }}
          label="Total Budget"
        >
          <Input
            type="number"
            id="totalBudget"
            readOnly
            defaultValue={defaultValues["Total Budget"]}
            {...methods.register("totalBudget")}
          />
        </FormRow>
        <FormRow
          style={{
            flex: "1 1 auto",
          }}
          label="Amount"
          error={errors?.amount?.message}
        >
          <Input
            type="number"
            id="amount"
            {...methods.register("amount", {
              max: {
                value: defaultValues["Total Budget"],
                message: `Amount cannot be greater than ${defaultValues.remainingProposalAmount} remaining in proposal`,
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
            defaultValue={defaultValues.currency}
            value={defaultValues.currency}
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
