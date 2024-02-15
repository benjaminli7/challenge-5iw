import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

function ManagerPlayerList({
  players,
  setSelectedUser,
  handleActionType,
  ACTION_TYPES,
}) {
  return (
    <Grid container spacing={4}>
      {players?.length === 0 && (
        <Grid item xs={12}>
          <Typography variant="h5">No player found</Typography>
        </Grid>
      )}
      {players?.map((player) => (
        <Grid item key={player.id} xs={12} md={6} lg={4}>
          <Card variant="outlined" sx={{ p: 3, height: "100%" }}>
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={
                    player.fileUrl &&
                    process.env.REACT_APP_API_URL + player.fileUrl
                  }
                  title={player.name}
                  sx={{ width: 100, height: 100 }}
                ></Avatar>
                <Typography variant="h6">
                  {player.firstName} '{player.username}' {player.lastName}
                </Typography>
              </Box>
              <Typography>{player.assignedGame.name}</Typography>
              <Typography>{player.discord}</Typography>
              {player.address && <Typography>{player.address}</Typography>}
              <Typography>{player.taux_horaire} coins per hour</Typography>
              <Typography>{player.coin_generated} coins generated</Typography>
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleActionType(ACTION_TYPES.EDIT_PLAYER_IMAGE);
                    setSelectedUser(player);
                  }}
                >
                  Image
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleActionType(ACTION_TYPES.ACCESS_PLAYER_CALENDAR);
                    setSelectedUser(player);
                  }}
                >
                  Calendar
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
