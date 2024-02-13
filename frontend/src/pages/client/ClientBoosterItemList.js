import { Avatar, Divider, Stack, Typography } from "@mui/material";

function ClientBoosterItemList({ player }) {
  return (
    <>
      <Stack direction="row" spacing={3} alignItems="center" py={1}>
        <Avatar />
        <Stack>
          <Typography sx={{ fontWeight: "bold" }}>
            {player.team.name}
          </Typography>
          <Typography>
            {player.firstName} '{player.username}' {player.lastName}{" "}
          </Typography>
          <Typography variant="subtitle2">
            {player.assignedGame.name}
          </Typography>
        </Stack>
      </Stack>
      <Divider />{" "}
    </>
  );
}

export default ClientBoosterItemList;
