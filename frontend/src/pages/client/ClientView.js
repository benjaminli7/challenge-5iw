import CustomButton from "@/components/commons/CustomButton";
import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { useAuthUser } from "react-auth-kit";

function formatDate(date) {
  return format(parseISO(date), "dd/MM/yyyy HH:mm");
}

function ClientView() {
  const auth = useAuthUser();
  const user = auth().user;
  const { data: client, isLoading } = useFetch(
    "client",
    ENDPOINTS.users.client(user.id)
  );
  if (isLoading) return <p>Loading...</p>;
  console.log(client);
  return (
    <Stack direction="column" spacing={3}>
      <Typography variant="h4">
        Welcome {client.username}, you have {client.coins} coins
      </Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Your incoming sessions
        </Typography>
        {client.bookings.map((booking, index) => (
          <Paper key={index} elevation={1} sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "center", sm: "flex-start" },
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
                }}
              >
                <Avatar />
                <Stack direction="column">
                  <Typography variant="subtitle" sx={{ fontWeight: "bold" }}>
                    {booking.schedule.booster.username}
                  </Typography>
                  <Typography variant="subtitle">
                    {booking.schedule.booster.discord}
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
              </Stack>
              <CustomButton variant="contained">Cancel</CustomButton>
            </Box>
          </Paper>
        ))}
      </Paper>
    </Stack>
  );
}

export default ClientView;
