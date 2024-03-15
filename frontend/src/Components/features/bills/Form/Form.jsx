import React from "react";
import { Controller } from "react-hook-form";

function Form({control}) {
  return (
    <Controller
      control={control}
      name="test"
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <input
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          ref={ref}
        />
      )}
    />
  );
}

export default Form;
