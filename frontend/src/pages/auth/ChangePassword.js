import { httpPost } from "@/services/api";
import ENDPOINTS from "@/services/endpoints";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function ChangePassword () {
  const [errorChangePassword, setErrorChangePassword] = useState(null);


  const {
    changePassword,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const response = await httpPost(`${ENDPOINTS.users.changePassword}`, data);
      changePassword({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {
          user: response.data.user,
        },
      });
    } catch (error) {
      console.log(error);
      setErrorChangePassword(error.response.data.message);
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
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
           <TextField
            {...changePassword("password", {
              required: "Password is required",
            })}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errors.password ? true : false}
            helperText={errors.password && errors.password.message}
          />
          <TextField
            {...changePassword("password", {
              required: "Password is required",
            })}
            margin="normal"
            required
            fullWidth
            name="passwordRetry"
            label="Password again"
            type="password"
            id="passwordRetry"
            autoComplete="current-password"
            error={errors.password ? true : false}
            helperText={errors.password && errors.password.message}
          />
          <Alert
            severity="error"
            sx={{ display: errorChangePassword ? "flex" : "none", mt: 2 }}
          >
            {errorChangePassword}
          </Alert>
          <Button
            disabled={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
