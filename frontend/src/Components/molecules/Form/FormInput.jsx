import { Controller } from "react-hook-form";
import Input from "../../atoms/Input/Input.jsx";
import FormRow from "../../atoms/FormRow/FormRow.jsx";
export const FormInputText = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "* is required",
      }}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormRow
          style={{
            flex: "1 1 100%",
          }}
          label={label}
          error={error?.message}
        >
          <Input
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value}
            label={label}
          />
        </FormRow>
      )}
    />
  );
};
