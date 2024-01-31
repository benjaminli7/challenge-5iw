import { FormControl, InputLabel, Select } from "@mui/material";
import { Controller } from "react-hook-form";

function CustomSelectForm({
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
          <Select labelId={labelId} label={label} {...field}>
            {children}
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
}

export default CustomSelectForm;
