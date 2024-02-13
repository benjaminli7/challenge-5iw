import CustomButton from "@/components/commons/CustomButton";
import { useTeams } from "@/hooks/models/useTeams";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { set, useForm } from "react-hook-form";
import { toast } from "sonner";
import styled from "@mui/material/styles/styled";
import { useState } from "react";
import { httpPostMultiPart } from "@/services/api";
import ENDPOINTS from "@/services/endpoints";
import { useQueryClient } from "react-query";

function TeamView({ team }) {
  const queryClient = useQueryClient();
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
  const [file, setFile] = useState(null);
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
      <Stack spacing={4}>
        <Typography variant="h4" component={"span"} className="titleBorder">
          Team {team?.name}
        </Typography>
        <Typography
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
            src={team?.fileUrl && process.env.REACT_APP_API_URL + team?.fileUrl}
            title={team?.name}
            sx={{ width: 100, height: 100 }}
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
                e.target.files[0] && handleImageUpload(e.target.files[0], team);
              }}
            />
          </Button>
        </Typography>
      </Stack>

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
    </Box>
  );
}

export default TeamView;
