import React from "react";
import { useForm } from "react-hook-form";
import FormRow from "../../../atoms/FormRow/FormRow";
import Input from "../../../atoms/Input/Input";
import Form from "../../../atoms/Form/Form";
import Button from "../../../atoms/Button/Button";
import useSubmitContact from "../../../hooks/Contacts/useSubmitContact";
import useSafeStore from "../../../../store/modules/safe/index.ts";
import useAuthStore from "../../../../store/modules/auth/index.ts";
import { isAddressValid } from "../../../../utils/logical/isAddressValid.js";
import { message } from "antd";

function EditContact({ defaultValues = "", onCloseModal }) {

  const { safeSelected } = useSafeStore();
  const { user: { daoId } } = useAuthStore();
  const { submit, loading } = useSubmitContact();
  
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      name: defaultValues?.name,
      address: defaultValues?.address,
    },
  });

  const handleFormSubmit = async (data) => {
    const contact = {
      ...data,
      safeaddress: safeSelected,
      daoid: daoId,
    }
    await submit(contact);
    if (loading) {
      message.loading({ content: "Saving contact...", key: "submitContact" });
    }
    !loading && onCloseModal();
  };

  return (
    <Form type={"modal"} width={"25rem"} onSubmit={handleSubmit(handleFormSubmit)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          placeholder="Name"
          id="name"
          name="name"
          {...register("name", {
            required: "Name is required",
          })}
        />
      </FormRow>
      <FormRow label="Address" error={errors?.address?.message}>
        <Input
          type="text"
          placeholder="Address"
          inputProps={{ "aria-label": "Enter Address" }}
          id="address"
          name="address"
          {...register("address", {
            required: "Address is required",
            //TODO: add validation for correct eth address
            validate: (value) => {
              return isAddressValid(value);
            }
          })}
        />
      </FormRow>
      <Button>Save</Button>
    </Form>
  );
}

export default EditContact;
