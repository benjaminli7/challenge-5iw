import { TextField } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

function ManagerTeamForm() {
  const { register, formState: {
    errors

  } } = useFormContext();
  return (
    <div>
      <h1>Team Form</h1>
      <TextField
        key={"name"}
        autoFocus
        margin="dense"
        id={"name"}
        label={"Team name"}
        fullWidth
        required
        error={errors.name ? true : false}
        helperText={errors.name && errors.name.message}
        {...register("name", { required: "Name required" })}
      />
    </div>
  );
}

export default ManagerTeamForm;
