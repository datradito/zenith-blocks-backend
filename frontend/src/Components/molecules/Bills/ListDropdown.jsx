import React from "react";
import Option from "../../atoms/Option/Option";
import SelectDropdown from "../../atoms/SelectDropdown/SelectDropdown";
const ListDropdown = ({ name, options, register, ...props }) => {

  return (
    <SelectDropdown
      name={name}
      onChange={(e) => {
        register(name); // Manually register the change with react-hook-form
      }}
      // {...register(name)}
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
