import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MenuItem } from "@mui/material";
import CustomSelectForm from "@/components/commons/CustomSelectForm";
import CustomButton from "@/components/commons/CustomButton";
import { toast } from "sonner"
import { useUsers } from "@/hooks/models/useUsers";

export default function Signup() {
  const { registerMutation } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    control,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerMutation.mutateAsync(data);
      toast.success("Signed up successfully");
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
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("firstName", {
                  required: "First name is required",
                })}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={errors.firstName ? true : false}
                helperText={errors.firstName && errors.firstName.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("lastName", {
                  required: "Last name is required",
                })}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomSelectForm
                id="type"
                name="type"
                label="Type"
                control={control}
                defaultValue={"client"}
                fullWidth
              >
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
              </CustomSelectForm>
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
                id="plainPassword"
                autoComplete="new-password"
                error={errors.password ? true : false}
                helperText={errors.password && errors.password.message}
              />
            </Grid>
            <Grid item xs={12}>
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
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                error={errors.confirmPassword ? true : false}
                helperText={
                  errors.confirmPassword && errors.confirmPassword.message
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
            Sign Up
          </CustomButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
