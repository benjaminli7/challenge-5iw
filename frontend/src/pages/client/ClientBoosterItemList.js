import { Avatar, Divider, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import StarRateIcon from "@mui/icons-material/StarRate";

function ClientBoosterItemList({ player }) {
  return (
    <>
      <Link to={`/client/players/${player.id}`}>
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
            {player.moyenneReviews && (
              <Typography variant="subtitle">
                <StarRateIcon style={{ color: "gold" }} />
                {player.moyenneReviews}{" "}
              </Typography>
            )}
          </Stack>
        </Stack>
        <Divider />
      </Link>
    </>
  );
}

export default ClientBoosterItemList;
