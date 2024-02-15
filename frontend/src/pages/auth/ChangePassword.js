import CustomButton from "@/components/commons/CustomButton";
import { useUsers } from "@/hooks/models/useUsers";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useIsAuthenticated } from "react-auth-kit";
import { useForm } from "react-hook-form";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { toast } from "sonner";

export default function ChangePassword() {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();
  function getParams(url) {
    const params = {};
    const urlSearchParams = new URLSearchParams(url.split("?")[1]);
    for (const [key, value] of urlSearchParams) {
      params[key] = value;
    }
    return params;
  }
  const params = getParams(window.location.search);
  const { changePasswordMutation } = useUsers(null, params["token"]);
  const onSubmit = async (data) => {
    try {
      let dataPassword = {
        password: data.newPassword,
      };
      await changePasswordMutation.mutateAsync(dataPassword);
      toast.success("Password changed successfully!");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Error changing password");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Change password
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                required
                fullWidth
                name="newPassword"
                label="New password"
                type="password"
                id="newPassword"
                autoComplete="new-password"
                error={errors.newPassword ? true : false}
                helperText={errors.newPassword && errors.newPassword.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("confirmNewPassword", {
                  required: "Confirm new password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: (value) =>
                    value === getValues("newPassword") ||
                    "The passwords do not match",
                })}
                required
                fullWidth
                name="confirmNewPassword"
                label="Confirm new password"
                type="password"
                id="confirmNewPassword"
                autoComplete="new-password"
                error={errors.confirmNewPassword ? true : false}
                helperText={
                  errors.confirmNewPassword && errors.confirmNewPassword.message
                }
              />
            </Grid>
          </Grid>
          <CustomButton
            isSubmitting={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </CustomButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Back to Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
