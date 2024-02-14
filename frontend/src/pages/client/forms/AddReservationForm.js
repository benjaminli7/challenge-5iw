import CustomButton from "@/components/commons/CustomButton";
import { useBookings } from "@/hooks/models/useBookings";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function AddReservationForm({
  startingDate,
  endingDate,
  scheduleId,
  userId,
  handleDialogClose,
}) {
  const { addBookingMutation } = useBookings();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    try {
      console.log(scheduleId);
      const data = {
        schedule: scheduleId,
        user: userId,
      };
      await addBookingMutation.mutateAsync(data);
      await handleDialogClose();
      toast.success("You have successfully booked this session!");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Error booking this session");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Book this session</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <DateTimePicker
            label="Starting date"
            disabled
            value={startingDate}
            format="yyyy-MM-dd HH:mm"
          />
          <DateTimePicker
            label="Ending date"
            disabled
            value={endingDate}
            format="yyyy-MM-dd HH:mm"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <CustomButton
          type="submit"
          variant="contained"
          isSubmitting={isSubmitting}
        >
          Submit
        </CustomButton>
      </DialogActions>
    </form>
  );
}

export default AddReservationForm;
