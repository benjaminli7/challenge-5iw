import Loader from "@/components/commons/Loader";
import useActionHandlers from "@/hooks/useActionHandlers";
import useFetch from "@/hooks/useFetch";
import ClientReservationItem from "@/pages/client/ClientReservationItem";
import CancelReservationForm from "@/pages/client/forms/CancelReservationForm";
import ENDPOINTS from "@/services/endpoints";
import { Dialog, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";

function ClientView() {
  const auth = useAuthUser();
  const user = auth().user;
  const { data: client, isLoading } = useFetch(
    "client",
    ENDPOINTS.users.client(user.id)
  );
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const { actionType, openDialog, handleDialogClose, handleActionType } =
    useActionHandlers();
  const ACTION_TYPES = {
    CANCEL_BOOKING: "CANCEL_BOOKING",
  };

  if (isLoading) return <Loader />
  const past_bookings = client.bookings.filter(
    (booking) => new Date(booking.schedule.endingDate) < new Date()
  );
  const incoming_bookings = client.bookings.filter(
    (booking) => new Date(booking.schedule.endingDate) > new Date()
  );

  return (
    <>
      <Stack direction="column" spacing={3}>
        <Typography variant="h4">
          Welcome {client.username}, you have {client.coins} coins
        </Typography>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Your upcoming sessions
          </Typography>
          {incoming_bookings.length === 0 && (
            <Typography>You have no upcoming sessions</Typography>
          )}
          {incoming_bookings.map((booking, index) => (
            <ClientReservationItem
              handleActionType={handleActionType}
              ACTION_TYPES={ACTION_TYPES}
              setSelectedBookingId={setSelectedBookingId}
              booking={booking}
              cancellable={true}
              key={index}
            />
          ))}
        </Paper>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Your past sessions
          </Typography>
          {past_bookings.length === 0 && (
            <Typography>You have no past sessions</Typography>
          )}

          {past_bookings.map((booking, index) => (
            <ClientReservationItem
              booking={booking}
              cancellable={false}
              key={index}
            />
          ))}
        </Paper>
      </Stack>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        {actionType === ACTION_TYPES.CANCEL_BOOKING && (
          <CancelReservationForm handleDialogClose={handleDialogClose} selectedBookingId={selectedBookingId} />
        )}
      </Dialog>
    </>
  );
}

export default ClientView;
