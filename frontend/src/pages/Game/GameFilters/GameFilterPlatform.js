// GameFilterPlatform.js
import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ComputerIcon from "@mui/icons-material/Computer";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const GameFilterPlatform = ({ config }) => {
  const platforms = [
    { name: "PC", icon: <ComputerIcon />, value: "pc" },
    { name: "Console", icon: <SportsEsportsIcon />, value: "console" },
  ];

  console.log(config);

  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: "space-evenly" }}>
      {platforms.map((platform) => (
        <Button
          key={platform.value}
          variant={config.value === platform.value ? "contained" : "outlined"}
          onClick={() => config.onChange(platform.value)}
        >
          {platform.icon}
        </Button>
      ))}
    </Stack>
  );
};

export default GameFilterPlatform;
