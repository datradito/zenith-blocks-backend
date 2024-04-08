import React from "react";
import { Controller } from "react-hook-form";
import SelectDropdown from "../../atoms/SelectDropdown/SelectDropdown";
import FormRow from "../../atoms/FormRow/FormRow";

function FormSelectDropdown({ control, options, rules, name }) {
  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <option key={option.name} value={option.name}>
          {option.name}
        </option>
      );
    });
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: `* ${name} is required`,
        ...rules,
      }}
      render={({ field, fieldState: { error }, formState }) => (
        <FormRow
          style={{
            flex: "1 1 50%",
          }}
          label={name}
          error={error?.message}
        >
          <SelectDropdown
            {...field}
            value={field.value?.name}
            onChange={(e) => {
              const selectedOption = options.find(
                (option) => option.name === e.target.value
              );
              console.log(selectedOption);
              field.onChange(selectedOption);
            }}
          >
            {generateSingleOptions()}
          </SelectDropdown>
        </FormRow>
      )}
    />
  );
}

export default FormSelectDropdown;
