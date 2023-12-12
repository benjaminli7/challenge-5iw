import React from "react";
import { DialogContent } from "@mui/material";
import {
  Button,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { httpPost, httpPatch, httpDelete, isAdmin } from "@/services/api";
import ENDPOINTS from "@/services/endpoints";
import TextField from "@mui/material/TextField";
import InputFileUpload from "../AdminGamesFileUpload";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm, useFieldArray } from "react-hook-form";
import { Typography } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: "100%",
});

function AdminGameForm({ form, onSubmit, handleClose }) {
  const [rankFields, setRankFields] = React.useState([{ id: 1, value: "" }]);
  const { getValues, register, handleSubmit, control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ranks",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>
        {" "}
        {getValues("id") ? "Mise à jour du jeux" : "Création d'un jeux"}
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
        <Typography id="discrete-slider" gutterBottom>
          Color:
        </Typography>
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
          value={getValues("color")}
        />
        {!getValues("id") ? (
          <>
            <DialogContentText>Ajouter des rangs</DialogContentText>
            <Grid container spacing={2}>
              {fields.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  key={item.id}
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={8}>
                    <TextField
                      key={item.id}
                      {...register(`ranks.${index}.name`)}
                      margin="dense"
                      label={`Rank ${index}`}
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => remove(index)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              onClick={() => append({ name: "" })}
              style={{ marginTop: "16px" }}
            >
              Ajouter
            </Button>
          </>
        ) : (
          <input type="hidden" {...register("id")} value={getValues("id")} />
        )}
      </DialogContent>
      <DialogActions>
        <Button type="submit">Send</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </form>
  );
}

export default AdminGameForm;
