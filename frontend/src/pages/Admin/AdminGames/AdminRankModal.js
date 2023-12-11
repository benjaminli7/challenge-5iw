import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputFileUpload from "./AdminGamesFileUpload"; // Assuming this is your existing component
import { useForm } from "react-hook-form"; // Update to use only the necessary hook
import { httpPut } from "@/services/api"; // Assuming you have a PUT request function
import { Alert } from "@mui/material";

export default function AdminRankModal({ rank, onUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const { register, handleSubmit } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      // Assuming you have an endpoint for updating a rank
      await httpPut(`${ENDPOINTS.ranks.update}/${rank.id}`, data);
      setSuccess(true);
      onUpdate(data.name); // Update parent component with the new rank name
    } catch (error) {
      console.log(error);
      // Handle error as needed
    }
  };

  return (
    <React.Fragment>
      <Alert
        severity="success"
        sx={{ display: success ? "flex" : "none", mt: 2 }}
      >
        Le rang a été mis à jour
      </Alert>
      <Button variant="contained" size="small" onClick={handleClickOpen}>
        Modifier
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Modifier le rang</DialogTitle>
          <DialogContent>
            <DialogContentText>Modifier le nom du rang</DialogContentText>
            <TextField
              {...register("name", { required: true })}
              autoFocus
              margin="dense"
              id="name"
              label="Nouveau nom du rang"
              type="text"
              fullWidth
              defaultValue={rank.name} // Pre-fill the current rank name
            />
            {/* If you have a separate component for updating, use it here */}
            <InputFileUpload />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button onClick={handleClose} type="submit">
              Enregister
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
