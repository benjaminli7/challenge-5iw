// GameSidebar.js
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GameFilterSelector from "./GameFilters/GameFilterSelector";
import GameFilterRange from "./GameFilters/GameFilterRange";
import GameFilterMap from "./GameFilters/GameFilterMap";
import GameFilterPlatform from "./GameFilters/GameFilterPlatform";
import GameFilterToggle from "./GameFilters/GameFilterToggle"; // Import the new component

const GameSidebar = ({ drawerWidth }) => {
  const teams = ["Équipe 1", "Équipe 2"];
  const gameTypes = ["Action", "Aventure", "Stratégie", "RPG"];
  const languages = ["English", "French", "Spanish", "German"];

  const [priceRange, setPriceRange] = useState(null);
  const [distance, setDistance] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedGameType, setSelectedGameType] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [mode, setMode] = useState(null);

  const handlePriceRangeChange = (_, newValue) => {
    setPriceRange(newValue);
  };

  const handleDistanceChange = (_, newValue) => {
    setDistance(newValue);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleGameTypeChange = (event) => {
    setSelectedGameType(event.target.value);
  };

  const handlePlatformChange = (value) => {
    setSelectedPlatform(value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleModeChange = (_, newMode) => {
    setMode(newMode);
  };

  const filtersConfig = [
    {
      type: "selector",
      label: "Jeu",
      options: gameTypes,
      onChange: handleGameTypeChange,
      value: selectedGameType,
    },
    {
      type: "selector",
      label: "Équipe",
      options: teams,
      onChange: handleTeamChange,
      value: selectedTeam,
    },
    {
      type: "range",
      label: "Distance",
      min: 1,
      max: 100,
      onChange: handleDistanceChange,
      value: distance,
    },
    {
      type: "range",
      label: "Plage de prix",
      min: 10,
      max: 1000,
      onChange: handlePriceRangeChange,
      value: priceRange,
    },
    {
      type: "map",
    },
    {
      type: "iconSelector",
      label: "Plateforme",
      onChange: handlePlatformChange,
      value: selectedPlatform,
    },
    {
      type: "selector",
      label: "Langue",
      options: languages,
      onChange: handleLanguageChange,
      value: selectedLanguage,
    },
    {
      type: "toggle",
      label: "Mode",
      options: ["Présentiel", "Distanciel"],
      onChange: handleModeChange,
      value: mode,
    },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <div>
        <Typography
          variant="h6"
          component="div"
          sx={{ p: 2, textAlign: "center" }}
        >
          Filtres
        </Typography>
        <List>
          {filtersConfig.map((filter, index) => (
            <React.Fragment key={index}>
              {filter.type === "selector" && (
                <GameFilterSelector config={filter} />
              )}
              {filter.type === "range" && <GameFilterRange config={filter} />}
              {filter.type === "map" && <GameFilterMap />}
              {filter.type === "iconSelector" && (
                <GameFilterPlatform config={filter} />
              )}
              {filter.type === "toggle" && <GameFilterToggle config={filter} />}
            </React.Fragment>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default GameSidebar;
