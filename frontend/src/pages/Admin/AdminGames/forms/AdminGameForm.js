import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/commons/CustomButton";

function AdminGameForm({
  selectedGame,
  onSubmit,
  actionType,
  handleDialogClose,
}) {
  const defaultValues = {
    name: selectedGame?.name || "",
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
        {actionType === "create" ? "Create a new game" : "Edit game"}
      </DialogTitle>
      <DialogContent>
        <TextField
          key={"name"}
          autoFocus
          margin="dense"
          id={"name"}
          label={"Name"}
          fullWidth
          {...register("name", { required: true })}
        />
      </DialogContent>
      <DialogActions>
        <CustomButton
          type="submit"
          variant="contained"
          isSubmitting={isSubmitting}
        >
          Submit
        </CustomButton>
        <Button onClick={handleDialogClose}>Cancel</Button>
      </DialogActions>
    </form>
  );
}

export default AdminGameForm;
