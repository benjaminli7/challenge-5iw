import CustomButton from "@/components/commons/CustomButton";
import { useUsers } from "@/hooks/models/useUsers";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Box,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { useForm } from "react-hook-form";
import { Navigate, Link as RouterLink, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { isAdmin } from "@/services/api";

export default function Login() {
  const [errorLogin, setErrorLogin] = useState(null);
  const { loginMutation } = useUsers();
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();
  let from = location.state?.from || isAdmin() ? "/admin" : "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  if (isAuthenticated()) {
    return <Navigate to={from} replace state={"test"} />;
  }

  const onSubmit = async (data) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      toast.success("Logged in successfully!");
      signIn({
        token: response.token,
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        tokenType: "Bearer",
        authState: {
          user: response.user,
        },
      });
    } catch (error) {
      console.log(error);
      setErrorLogin(error.response.data.message);
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
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Please enter a valid email",
              },
            })}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            placeholder="johndoe@gmail.com"
            autoFocus
            error={errors.email ? true : false}
            helperText={errors.email && errors.email.message}
          />
          <TextField
            {...register("password", {
              required: "Password is required",
            })}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="********"
            autoComplete="current-password"
            error={errors.password ? true : false}
            helperText={errors.password && errors.password.message}
          />
          <Alert
            severity="error"
            sx={{ display: errorLogin ? "flex" : "none", mt: 2 }}
          >
            {errorLogin}
          </Alert>
          <CustomButton
            isSubmitting={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </CustomButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
