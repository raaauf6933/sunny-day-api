import React from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const SelectComponent = ({
  name,
  label,
  choices,
  onChange,
  value,
  margin,
  hasDefaultNone,
}) => {
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
          {/* <MenuItem value={"ACT"}>
            <em>ACTIVATE</em>
          </MenuItem> */}
          {hasDefaultNone ? (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          ) : null}

          {choices && choices.lenght !== 0 ? (
            choices.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                <em>{item.label}</em>
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
