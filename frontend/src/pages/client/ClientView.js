import Loader from "@/components/commons/Loader";
import useActionHandlers from "@/hooks/useActionHandlers";
import useFetch from "@/hooks/useFetch";
import ClientReservationItem from "@/pages/client/ClientReservationItem";
import CancelReservationForm from "@/pages/client/forms/CancelReservationForm";
import AddReviewForm from "@/pages/client/forms/AddReviewForm";
import ENDPOINTS from "@/services/endpoints";
import {
  Dialog,
  Paper,
  Stack,
  Typography,
  Box,
  Button,
  Modal,
} from "@mui/material";
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

  const [booking, setBooking] = useState(null);
  const [open, setOpen] = useState(false);
  const { actionType, openDialog, handleDialogClose, handleActionType } =
    useActionHandlers();
  const ACTION_TYPES = {
    CANCEL_BOOKING: "CANCEL_BOOKING",
    ADD_REVIEW: "ADD_REVIEW",
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
            <Box key={index}>
              <ClientReservationItem
                booking={booking}
                cancellable={false}
                key={index}
              />
              <Button
                onClick={() => {
                  handleActionType(ACTION_TYPES.ADD_REVIEW);
                  setBooking(booking);
                }}
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                Add Review
              </Button>
            </Box>
          ))}
        </Paper>
      </Stack>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        {actionType === ACTION_TYPES.CANCEL_BOOKING && (
          <CancelReservationForm selectedBookingId={selectedBookingId} />
        )}
      </Dialog>

      {actionType === ACTION_TYPES.ADD_REVIEW && (
        <Modal
          open={actionType === ACTION_TYPES.ADD_REVIEW}
          onClose={handleDialogClose}
        >
          <AddReviewForm
            selectedBooking={booking}
            handleDialogClose={handleDialogClose}
          />
        </Modal>
      )}
    </>
  );
}

export default ClientView;
