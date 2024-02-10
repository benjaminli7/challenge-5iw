// GameView.js
import React from "react";
import GameSidebar from "./GameSidebar";
import MainContent from "./GameMainContent";

const GameView = () => {
  const sidebarWidth = 200; // Set your desired sidebar width

  const containerStyle = {
    display: "flex",
    height: "100vh", // Adjust the height based on your design
    // "background-color": "black",
  };

  const sidebarStyle = {
    width: sidebarWidth,
    flexShrink: 0,
  };

  const mainContentStyle = {
    flex: 1,
    padding: "20px", // Adjust padding based on your design
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <GameSidebar drawerWidth={sidebarWidth} />
      </div>
      <div style={mainContentStyle}>
        <MainContent />
      </div>
    </div>
  );
};

export default GameView;
