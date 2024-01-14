import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function AdminGamesList({ games }) {
  return (
    <Grid container spacing={4}>
      {games?.map((game) => (
        <Grid item key={game.id} xs={12} sm={6} md={4}>
          <Typography variant="h6">{game.name}</Typography>
          {game.ranks.map((rank) => (
            <Typography key={rank.id} variant="body1">
              {rank.name}
            </Typography>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}
