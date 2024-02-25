import React from "react";
import Form from "../../../atoms/Form/Form";
import FormRow from "../../../atoms/FormRow/FormRow";
import { InputBase } from "@mui/material";

import { useForm } from "react-hook-form";
import Button from "../../../atoms/Button/Button";

function EditContact() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const handleFormSubmit = (data) => {
    console.log(data);
  };
  return (
    <Form type={"modal"} onSubmit={handleSubmit(handleFormSubmit)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <InputBase
          type="text"
          placeholder="Name"
          inputProps={{ "aria-label": "Enter Name" }}
          id="name"
          name="name"
          {...register("name", {
            required: "Name is required",
          })}
        />
      </FormRow>
      <Button>
        Save
      </Button>
    </Form>
  );
}

export default EditContact;
