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

export default function AdminGamesModal({ handleClose, actionType}) {

  return (
    <>
      <DialogTitle>Create new game</DialogTitle>
      <DialogContent>
        <AdminGameCreateForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </>
  )

}
