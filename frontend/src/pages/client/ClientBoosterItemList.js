import { Avatar, Divider, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ClientBoosterItemList({ player }) {
  return (
    <>
      <Link to={`/client/player/${player.id}`}>
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
        <Divider />
      </Link>
    </>
  );
}

export default ClientBoosterItemList;
