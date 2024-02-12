import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/commons/CustomButton";

function PlayerEventForm({ actionType, startingDate, endingDate, onSubmit, handleDeleteSchedule, deleteScheduleMutation }) {
  const defaultValues = {
    startingDate: startingDate,
    endingDate: endingDate,
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>
        {actionType === "create" ? "Add a new event" : "Update event"}{" "}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <DateTimePicker
            label="Starting date"
            disabled
            value={startingDate}
            format="yyyy-MM-dd HH:mm"
            {...register("startingDate")}
          />
          <DateTimePicker
            label="Ending date"
            disabled
            value={endingDate}
            format="yyyy-MM-dd HH:mm"
            {...register("endingDate")}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        {actionType === "create" ? (
          <CustomButton
            type="submit"
            variant="contained"
            isSubmitting={isSubmitting}
          >
            Submit
          </CustomButton>
        ) : (
          <CustomButton
            type="button"
            isSubmitting={deleteScheduleMutation.isLoading}
            onClick={handleDeleteSchedule}
            variant="contained"
            color="error"
          >
            Delete
          </CustomButton>
        )}
      </DialogActions>
    </form>
  );
}

export default PlayerEventForm;
