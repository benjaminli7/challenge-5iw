import CustomButton from "@/components/commons/CustomButton";
import { useUsers } from "@/hooks/models/useUsers";
import { Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function UpdateProfileForm({ user }) {
  const defaultValues = {
    discord: user.discord || "",
  };

  const { updateUserMutation } = useUsers(user.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    try {
      await updateUserMutation.mutateAsync(data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField label="E-mail" value={user.email} disabled fullWidth />
        <TextField label="Username" value={user.username} disabled fullWidth />
        <TextField
          {...register("discord", {
            required: "Your discord name is required",
            pattern: {
              value: /^.{3,32}#[0-9]{4}$/i,
              message: "Invalid Discord format. Example: username#1234",
            },
          })}
          required
          fullWidth
          name="discord"
          label="Discord"
          type="text"
          id="discord"
          placeholder="username#1234"
          error={errors.discord ? true : false}
          helperText={errors.discord && errors.discord.message}
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

export default UpdateProfileForm;
