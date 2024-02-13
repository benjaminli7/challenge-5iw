import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import ENDPOINTS from "@/services/endpoints";
import { useCustomMutation } from "@/hooks/useCustomMutation";

export default function ChangePassword() {

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, getValues } = useForm();
  function getParams(url) {
    const params = {};
    const urlSearchParams = new URLSearchParams(url.split('?')[1]);
    for (const [key, value] of urlSearchParams) {
        params[key] = value;
    }
    return params;
  }
  const params = getParams(window.location.search);
  const changePassword = useCustomMutation(ENDPOINTS.users.changePassword(params['token']),"post", "data") // Adjust the endpoint
  const onSubmit = async (data) => {
    try {
      let dataPassword = {
        'password' : data.newPassword,
      }
      await changePassword.mutateAsync(dataPassword);
      console.log(response)
      reset();
    } catch (error) {
      console.log(error);
    }
  }

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
        <Typography component="h1" variant="h5">
          Change Password
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
                label="New Password"
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
                  validate: (value) => value === getValues("newPassword") || "The passwords do not match",
                })}
                required
                fullWidth
                name="confirmNewPassword"
                label="Confirm New Password"
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
          <Button
            disabled={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
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