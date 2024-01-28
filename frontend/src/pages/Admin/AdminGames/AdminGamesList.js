import { Box, Button, Card, Grid, Typography } from "@mui/material";

export default function AdminGamesList({
  games,
  setSelectedGame,
  handleActionType,
  ACTION_TYPES,
}) {
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
            <Box sx={{ display: 'flex', gap: 2 }}>

              <Button variant="contained" color="primary" onClick={() => {
                handleActionType(ACTION_TYPES.EDIT_GAME);
                setSelectedGame(game);
              }}>
                Edit game
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleActionType(ACTION_TYPES.CREATE_RANK);
                  setSelectedGame(game);
                }}
              >
                Add rank
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
