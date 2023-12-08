import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputFileUpload from "./AdminGamesFileUpload";
import { useForm, useFieldArray } from "react-hook-form";
import ENDPOINTS from "@/services/endpoints";
import { httpPost, isAdmin } from "@/services/api";
import { Alert } from "@mui/material";
import AdminGameCreateForm from "./forms/AdminGameCreateForm";

export default function AdminGamesModal({ fullScreen, addToGamesList }) {
  const [open, setOpen] = React.useState(false);
  const [game, setGame] = React.useState({ name: "", image: "" });
  const [rankFields, setRankFields] = React.useState([{ id: 1, value: "" }]);
  const [success, setSuccess] = React.useState(false);
  const { register, control, handleSubmit, reset, trigger, setError } =
    useForm();
  const [errorGame, setErrorGame] = React.useState(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ranks",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddRank = () => {
    const newRankFields = [
      ...rankFields,
      { id: rankFields.length + 1, value: "" },
    ];
    setRankFields(newRankFields);
  };

  const handleRankChange = (id, value) => {
    const updatedRankFields = rankFields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setRankFields(updatedRankFields);
  };

  const onSubmit = async (data) => {
    try {
      const response = await httpPost(`${ENDPOINTS.games.root}`, data);
      setSuccess(true);
      addToGamesList((prev) => [...prev, response.data]);
    } catch (error) {
      console.log(error);
      setErrorGame(error.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <Alert
        severity="error"
        sx={{ display: errorGame ? "flex" : "none", mt: 2 }}
      >
        {errorGame}
      </Alert>
      <Alert
        severity="success"
        sx={{ display: success ? "flex" : "none", mt: 2 }}
      >
        Le jeu a été ajouté
      </Alert>
      <Button variant="contained" size="large" onClick={handleClickOpen}>
        Ajouter un jeu
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <AdminGameCreateForm />
      </Dialog>
    </React.Fragment>
  );
}
