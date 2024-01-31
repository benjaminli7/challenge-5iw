import { Box, Button, Card, Grid, Stack, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function AdminGamesList({
  games,
  setSelectedGame,
  setSelectedRank,
  handleActionType,
  ACTION_TYPES,
}) {
  return (
    <Grid container spacing={4}>
      {games?.map((game) => (
        <Grid item key={game.id} xs={12} sm={4}>
          <Card variant="outlined" sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h6">{game.name}</Typography>
              {game.ranks.map((rank) => (
                <Card key={rank.id} variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                    <Typography key={rank.id} variant="body1">
                      {rank.name}
                    </Typography>
                    <IconButton
                      color="primary"
                      aria-label="edit rank"
                      onClick={() => {
                        handleActionType(ACTION_TYPES.EDIT_RANK)
                        setSelectedRank(rank)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Card>
              ))}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleActionType(ACTION_TYPES.EDIT_GAME);
                    setSelectedGame(game);
                  }}
                >
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
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
