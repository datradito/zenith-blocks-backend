import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 24;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(item, optionValue, theme) {
  return {
    fontWeight:
      optionValue.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SearchSelect({ onChange, options }) {
  const theme = useTheme();
  const [optionValue, setOptionValue] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setOptionValue(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    onChange(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ minWidth: "5rem" }} size="small" border="none">
        <InputLabel id="multiple-status-label">Filter</InputLabel>
        <Select
          labelId="multiple-status-label"
          id="multiple-status"
          multiple
          value={optionValue}
          onChange={handleChange}
          input={<OutlinedInput label="Status" />}
          MenuProps={MenuProps}
        >
          {options.map((item) => (
            <MenuItem
              key={item}
              value={item}
              style={getStyles(item, optionValue, theme)}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
