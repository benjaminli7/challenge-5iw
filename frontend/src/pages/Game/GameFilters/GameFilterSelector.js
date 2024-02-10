// GameFilterSelector.js
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItem from "@mui/material/ListItem";

const GameFilterSelector = ({ config, onChange, value }) => {
  const { label, options } = config;

  return (
    <ListItem>
      <FormControl fullWidth variant="standard">
        <InputLabel id={`${label}-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-label`}
          id={`${label}-select`}
          onChange={onChange}
          value={value}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ListItem>
  );
};

export default GameFilterSelector;
