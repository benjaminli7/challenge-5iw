import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { httpPost } from "@/services/api";
import ENDPOINTS from "@/services/endpoints";

export default function ForgotPassword() {

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [emailSent, setEmailSent] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await httpPost(`${ENDPOINTS.users.resetPassword}`, data) // Adjust the endpoint
      console.log(response)
      console.log("click")
      setSnackbarOpen(true);
      setEmailSent(true);

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        {emailSent ? (
          <Typography variant="body1" color="textSecondary">
            An email with instructions to reset your password has been sent to your email address.
          </Typography>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={errors.email ? true : false}
              helperText={errors.email && errors.email.message}
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Reset Email
            </Button>

          </form>
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity="success"
          >
            An email with instructions to reset your password has been sent to your email address.
          </MuiAlert>
        </Snackbar>
      </Box>
    </Container>
  );
}
