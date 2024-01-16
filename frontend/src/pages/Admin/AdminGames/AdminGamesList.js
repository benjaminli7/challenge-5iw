import { Button, Card, Grid, Typography } from "@mui/material";

export default function AdminGamesList({ games, handleOpen }) {
  return (
    <Grid container spacing={4}>
      {games?.map((game) => (
        <Grid item key={game.id} xs={12} sm={6}>
          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6">{game.name}</Typography>
            {game.ranks.map((rank) => (
              <Typography key={rank.id} variant="body1">
                {rank.name}
              </Typography>
            ))}
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Add rank
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
