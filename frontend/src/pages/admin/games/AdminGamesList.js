import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import AdminRankItem from "@/pages/admin/games/AdminRankItem";

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
        <Grid item key={game.id} xs={12} md={6} lg={4}>
          <Card variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Stack spacing={2}>
              <Typography variant="h6">{game.name}</Typography>
              {game.ranks.map((rank) => (
                <AdminRankItem
                  key={rank.id}
                  rank={rank}
                  handleActionType={handleActionType}
                  setSelectedRank={setSelectedRank}
                  ACTION_TYPES={ACTION_TYPES}
                />
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
