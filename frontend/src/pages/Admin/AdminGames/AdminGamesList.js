import React from "react";
import AdminGameCard from "./AdminGamesCard";
import Grid from "@mui/material/Grid";

export default function AdminGameList({ games, updateGamesList }) {
  return (
    <Grid container spacing={2}>
      {games.map((game, index) => (
        <Grid item key={game.id} xs={12} sm={6} md={3} sx={{ height: "100%" }}>
          <AdminGameCard game={game} updateGamesList={updateGamesList} />
        </Grid>
      ))}
    </Grid>
  );
}
