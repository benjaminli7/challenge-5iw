import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

function ManagerIbanForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-12">
      <TextField
        key={"iban"}
        autoFocus
        margin="dense"
        id={"iban"}
        label={"IBAN"}
        fullWidth
        required
        error={errors.iban ? true : false}
        helperText={errors.iban && errors.iban.message}
        {...register("iban", {
          required: "IBAN required",
          pattern: {
            value: /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/,
            message: "Invalid IBAN",
          },
        })}
      />
    </div>
  );
}

export default ManagerIbanForm;
