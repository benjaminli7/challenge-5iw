import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";

function formatDate(date) {
  return format(parseISO(date), "dd/MM/yyyy HH:mm");
}

function PlayerReservationItem({ schedule }) {
  return (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "center", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Avatar />
          <Stack direction="column">
            <Typography variant="subtitle" sx={{ fontWeight: "bold" }}>
              {schedule.client.username}
            </Typography>
            <Typography variant="subtitle">
              {schedule.client.discord}
            </Typography>
          </Stack>
        </Box>
        <Stack>
          <Typography variant="subtitle2" sx={{ textAlign: {xs: "center", sm: "right"} }}>
            From {formatDate(schedule.startingDate)}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: {xs: "center", sm: "right"} }}>
            To {formatDate(schedule.endingDate)}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: {xs: "center", sm: "right"} }}>
            {schedule.coinsNeeded} coins
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}

export default PlayerReservationItem;
