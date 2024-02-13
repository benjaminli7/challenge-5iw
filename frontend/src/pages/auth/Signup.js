import CustomButton from "@/components/commons/CustomButton";
import CustomSelectForm from "@/components/commons/CustomSelectForm";
import { useUsers } from "@/hooks/models/useUsers";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "sonner";

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
      console.log(data);
      await registerMutation.mutateAsync(data);
      toast.success("Signed up successfully");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Error signing up");
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
                placeholder="johndoe@gmail.com"
                error={errors.email ? true : false}
                helperText={errors.email && errors.email.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("username", {
                  required: "Username is required",
                })}
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                placeholder="johndoe123"
                autoFocus
                error={errors.username ? true : false}
                helperText={errors.username && errors.username.message}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("address", {
                  required: "Address is required",
                })}
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                placeholder="1234 Main St"
                error={errors.address ? true : false}
                helperText={errors.address && errors.address.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("postal", {
                  required: "Postal is required",
                  pattern: {
                    value: /^[0-9]{5}$/i,
                    message: "Invalid postal code",
                  },
                })}
                required
                fullWidth
                id="postal"
                label="Zip / Postal code"
                name="postal"
                autoComplete="postal"
                placeholder="12345"
                error={errors.postal ? true : false}
                helperText={errors.postal && errors.postal.message}
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
                placeholder="********"
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
                placeholder="********"
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
