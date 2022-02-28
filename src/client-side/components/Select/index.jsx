import React from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const SelectComponent = ({ name, label, choices, onChange, value, margin }) => {
  return (
    <>
      <FormControl required fullWidth margin={margin ? margin : "none"}>
        <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
        <Select
          name={name}
          label={label}
          value={value}
          labelId="demo-simple-select-autowidth-label"
          onChange={onChange}
        >
          {choices && choices.lenght !== 0 ? (
            choices.map((province) => (
              <MenuItem value={province.value}>
                <em>{province.label}</em>
              </MenuItem>
            ))
          ) : (
            <MenuItem value={null}>
              <em></em>
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectComponent;
