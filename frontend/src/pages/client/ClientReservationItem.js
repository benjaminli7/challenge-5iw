import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";

function formatDate(date) {
  return format(parseISO(date), "dd/MM/yyyy HH:mm");
}

function ClientReservationItem({ booking, cancellable, setSelectedBookingId, handleActionType, ACTION_TYPES}) {
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
              {booking.schedule.booster.team}
            </Typography>
            <Typography variant="subtitle" sx={{ fontWeight: "bold" }}>
              {booking.schedule.booster.username}
            </Typography>
            <Typography variant="subtitle">
              {booking.schedule.booster.discord}
            </Typography>
            <Typography variant="subtitle">
              {booking.schedule.booster.assignedGame}
            </Typography>
          </Stack>
        </Box>
        <Stack>
          <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
            From {formatDate(booking.schedule.startingDate)}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
            To {formatDate(booking.schedule.endingDate)}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
            {booking.schedule.coinsNeeded} coins
          </Typography>
        </Stack>
        {cancellable && (
          <Button
            variant="contained"
            onClick={() => {
              setSelectedBookingId(booking.id);
              handleActionType(ACTION_TYPES.CANCEL_BOOKING);
            }}
          >
            Cancel
          </Button>
        )}
      </Box>
    </Paper>
  );
}

export default ClientReservationItem;
