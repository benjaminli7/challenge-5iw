import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

function ManagerTeamForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-12">
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
        {...register("name", {
          required: "Team name required",
          minLength: { value: 3, message: "Minimum 3 characters" },
        })}
      />
    </div>
  );
}

export default ManagerTeamForm;
