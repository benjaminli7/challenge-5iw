// GameFilterRange.js
import React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";

const GameFilterRange = ({ config, onChange, value }) => {
  const { label, min, max } = config;

  return (
    <ListItem sx={{ display: "flex", flexDirection: "column" }}>
      <Typography>{label} : </Typography>
      <Typography sx={{ fontSize: 12, color: "gray" }}>
        Inférieur à {value}
      </Typography>
      <Slider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        getAriaLabel={() => label}
        getAriaValueText={(valuetext, value) => `${value[0]} - ${value[1]}`}
        disableSwap
      />
    </ListItem>
  );
};

export default GameFilterRange;
