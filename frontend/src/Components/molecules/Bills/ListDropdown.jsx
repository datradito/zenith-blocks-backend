import React from "react";
import { useFormContext } from "react-hook-form";
import Option from "../../atoms/Option/Option";
import SelectDropdown from "../../atoms/SelectDropdown/SelectDropdown";
const ListDropdown = ({ name, options, ...props }) => {
  const { register } = useFormContext();

  return (
      <SelectDropdown
          name={name}
          ref={register}
          {...props}  
      >
      {options.map((option, index) => (
        <Option key={index} value={option.name}>
          {option.name}
        </Option>
      ))}
    </SelectDropdown>
  );
};

export default ListDropdown;
