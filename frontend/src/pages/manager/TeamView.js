import CustomButton from "@/components/commons/CustomButton";
import { useTeams } from "@/hooks/models/useTeams";
import { httpPostMultiPart } from "@/services/api";
import ENDPOINTS from "@/services/endpoints";
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { toast } from "sonner";

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
function TeamView({ team }) {
  if (!team) return null;
  const [file, setFile] = useState(null);
  const queryClient = useQueryClient();
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
  const handleImageUpload = async (data, team) => {
    try {
      setFile(data);
      let response = null;
      response = await httpPostMultiPart(
        ENDPOINTS.teams.teamImg(team.id),
        data
      );
      setFile(null);
      await queryClient.invalidateQueries("team");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="h4" component={"span"} className="titleBorder">
        Team {team?.name}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
            <Stack spacing={4}>
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
              </div>
                <CustomButton
                  isSubmitting={isSubmitting}
                  type="submit"
                  color="blue"
                  fullWidth
                  variant="contained"
                  sx={{  color: "#fff" }}
                >
                  Save
                </CustomButton>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={3}>
            {/* <Typography
                variant="h5"
                component={"span"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                Team's Logo
                <Avatar
                  src={
                    team?.fileUrl &&
                    process.env.REACT_APP_API_URL + team?.fileUrl
                  }
                  title={team?.name}
                  sx={{ width: 150, height: 150 }}
                  variant="square"
                ></Avatar>
                <Button
                  component="label"
                  variant="contained"
                  // startIcon={<CloudUploadIcon />}
                  sx={{ mt: 2 }}
                >
                  Ajouter une image
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      e.target.files[0] &&
                        handleImageUpload(e.target.files[0], team);
                    }}
                  />
                </Button>
              </Typography> */}
            <Stack direction="column" spacing={3} alignItems="flex-start">
              <Avatar
                src={
                  team?.fileUrl && process.env.REACT_APP_API_URL + team?.fileUrl
                }
                title={team?.name}
                sx={{width: "100%", height: "100%", borderRadius: "5px" }}
                variant="square"
              ></Avatar>
              <Button
                component="label"
                variant="contained"
                // startIcon={<CloudUploadIcon />}
                sx={{ mt: 2 }}
                fullWidth
              >
                Ajouter une image
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    e.target.files[0] &&
                      handleImageUpload(e.target.files[0], team);
                  }}
                />
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default TeamView;
