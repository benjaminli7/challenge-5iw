import { Avatar, Divider, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

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
          <Button variant="contained" color="primary">
            <Link to={`/client/player/${player.id}`}>
              Reserver avec ce joueur
            </Link>
          </Button>
        </Stack>
      </Stack>
      <Divider />{" "}
    </>
  );
}

export default ClientBoosterItemList;
