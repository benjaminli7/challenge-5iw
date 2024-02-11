import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/commons/CustomButton";

function AdminGameForm({
  deleteGameMutation,
  handleDeleteGame,
  selectedGame,
  onSubmit,
  actionType,
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
        <Typography variant="">
          Pick a color for the game
          <input
            type="color"
            {...register("color", { required: true })}
            autoFocus
            key="color"
            label="color"
            sx={{
              transform: "scale(1.5)",
              marginLeft: "10px",
              borderRadius: "50%",
            }}
          />
        </Typography>
      </DialogContent>
      <DialogActions>
        <CustomButton
          type="submit"
          variant="contained"
          isSubmitting={isSubmitting}
        >
          Submit
        </CustomButton>
        {actionType === "update" && (
          <CustomButton
            type="button"
            isSubmitting={deleteGameMutation.isLoading}
            onClick={handleDeleteGame}
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

export default AdminGameForm;
