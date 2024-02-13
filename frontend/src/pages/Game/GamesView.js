// GameView.js
import React from "react";
import GameCardsView from "./GameCards/GameCardsView";

const GamesView = () => {
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
    padding: "0px", // Adjust padding based on your design
  };

  return (
    <div style={containerStyle}>
      <div style={mainContentStyle}>
        <GameCardsView />
      </div>
    </div>
  );
};

export default GamesView;
