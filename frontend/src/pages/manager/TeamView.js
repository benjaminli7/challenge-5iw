import CustomButton from "@/components/commons/CustomButton";
import { useTeams } from "@/hooks/models/useTeams";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
function TeamView({ team }) {
  if (!team) return null;
  const { updateTeamMutation } = useTeams(team.id);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: team.name,
      iban: team.iban,
    },
  });
  const onSubmit = async (data) => {
    try {
      await updateTeamMutation.mutateAsync(data);
      toast.success("Team updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error updating team");
    }
  };
  return (
    <>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Stack spacing={4}>
          <Typography variant="h4" component={"span"} className="titleBorder">
            Team {team?.name}
          </Typography>
          <div>
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
                // pattern: {
                //   value: /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/,
                //   message: "Invalid IBAN",
                // },
              })}
            />
            <CustomButton
              isSubmitting={isSubmitting}
              type="submit"
              color="blue"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "#fff" }}
            >
              Save
            </CustomButton>
          </div>
        </Stack>
      </Box>
    </>
  );
}

export default TeamView;
