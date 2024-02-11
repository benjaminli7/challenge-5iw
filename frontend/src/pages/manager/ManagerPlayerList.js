import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";

function ManagerPlayerList({
  players,
  setSelectedUser,
  handleActionType,
  ACTION_TYPES,
}) {
  return (
    <Grid container spacing={4}>
      {players?.map((player) => (
        <Grid item key={player.id} xs={12} md={6} lg={4}>
          <Card variant="outlined" sx={{ p: 3, height: "100%" }}>
            <Stack spacing={2}>
              <Typography variant="h6">
                {player.firstName} '{player.username}' {player.lastName}
              </Typography>
              <Typography>{player.assignedGame.name}</Typography>
              <Typography>{player.discord}</Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleActionType(ACTION_TYPES.EDIT_PLAYER);
                    setSelectedUser(player);
                  }}
                >
                  Edit player
                </Button>
              </Box>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ManagerPlayerList;
