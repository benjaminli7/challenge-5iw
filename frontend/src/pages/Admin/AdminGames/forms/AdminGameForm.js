import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";

function AdminGameForm({ onSubmit, actionType, handleClose }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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
        <Button type="submit">Send</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </form>
  );
}

export default AdminGameForm;
