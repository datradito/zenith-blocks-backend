import TextField from "@mui/material/TextField";

const TextFieldAtom = ({ config, value, onChange, disabled, InputProps }) => {
  return (
    <TextField
      id={config.id}
      variant={config.variant}
      label={config.label}
      type={config.type}
      inputProps={InputProps}
      placeholder={config.placeholder}
      sx={config.sx}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextFieldAtom;
