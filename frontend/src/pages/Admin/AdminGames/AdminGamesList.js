import React from "react";
import AdminGameCard from "./AdminGamesCard";
import Grid from "@mui/material/Grid";

export default function AdminGameList({ games, updateGamesList }) {
  return (
    <Grid container spacing={4}>
      {games.map((game, index) => (
        <Grid
          sx={{ display: "flex", justify: "" }}
          item
          key={game.id}
          xs={12}
          sm={6}
          md={4}
          justifyContent="center"
          alignItems="center"
        >
          <AdminGameCard
            game={game}
            updateGamesList={updateGamesList}
            sx={{ backgroundColor: "black" }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
