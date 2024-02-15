import CustomButton from "@/components/commons/CustomButton";
import { Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUsers } from "@/hooks/models/useUsers";
import { toast } from "sonner";

function UpdatePasswordForm({ user }) {
  const { updateUserMutation } = useUsers(user.id);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await updateUserMutation.mutateAsync(data);
      toast.success("Password updated successfully");
      reset();

    } catch (error) {
      console.error(error);
      toast.error("Error updating password");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          {...register("plainPassword", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          required
          fullWidth
          name="plainPassword"
          label="Password"
          type="password"
          placeholder="********"
          id="plainPassword"
          autoComplete="new-password"
          error={errors.password ? true : false}
          helperText={errors.password && errors.password.message}
        />
        <TextField
          {...register("confirmPassword", {
            required: "Confirm password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: (value) =>
              value === getValues("plainPassword") ||
              "The passwords do not match",
          })}
          required
          fullWidth
          name="confirmPassword"
          label="Confirm password"
          placeholder="********"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          error={errors.confirmPassword ? true : false}
          helperText={errors.confirmPassword && errors.confirmPassword.message}
        />
        <CustomButton
          fullWidth
          isSubmitting={isSubmitting}
          type="submit"
          variant="contained"
        >
          Update
        </CustomButton>
      </Stack>
    </form>
  );
}

export default UpdatePasswordForm;
