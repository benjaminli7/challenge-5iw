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

import { useForm, useFieldArray } from "react-hook-form";

function AdminGameForm({ form, onSubmit, handleClose }) {
  const [rankFields, setRankFields] = React.useState([{ id: 1, value: "" }]);
  const { getValues, register, handleSubmit, control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ranks",
  });
  //   console.log(getValues);
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
