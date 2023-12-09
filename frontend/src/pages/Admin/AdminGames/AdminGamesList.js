import React from "react";
import AdminGameCard from "./AdminGamesCard";
import Grid from "@mui/material/Grid";

export default function AdminGameList({ games, updateGamesList }) {
  return (
    <Grid container spacing={2}>
      {games.map((game, index) => (
        <Grid sx={{ display: "flex" }} item key={game.id} xs={12} sm={8} md={4}>
          <AdminGameCard
            game={game}
            updateGamesList={updateGamesList}
            sx={{ height: "100%", p: 12 }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
