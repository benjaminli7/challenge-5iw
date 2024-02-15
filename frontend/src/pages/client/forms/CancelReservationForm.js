import CustomButton from "@/components/commons/CustomButton";
import { useBookings } from "@/hooks/models/useBookings";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function CancelReservationForm({ selectedBookingId, handleDialogClose }) {
  const { cancelBookingMutation } = useBookings(selectedBookingId);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    try {
      await cancelBookingMutation.mutateAsync();
      await handleDialogClose();
      toast.success("Booking canceled");
    } catch (error) {
      console.error("Error canceling booking:", error);
      toast.error("Error canceling booking");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Cancel booking</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to cancel this booking?</Typography>
      </DialogContent>
      <DialogActions>
        <CustomButton
          type="submit"
          isSubmitting={isSubmitting}
          variant="contained"
        >
          Submit
        </CustomButton>
      </DialogActions>
    </form>
  );
}

export default CancelReservationForm;
