import { FormControl, InputLabel, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { Rating } from "@mui/material";


function CustomRating({
  name,
  label,
  control,
  defaultValue,
  children,
  ...props
}) {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        render={({ field }) => (
          <Rating {...field} />
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
}

export default CustomRating;
