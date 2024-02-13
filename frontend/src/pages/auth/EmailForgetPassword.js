import CustomButton from "@/components/commons/CustomButton";
import { useUsers } from "@/hooks/models/useUsers";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useIsAuthenticated } from "react-auth-kit";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export default function ForgotPassword() {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const { resetPasswordMutation } = useUsers();
  const onSubmit = async (data) => {
    try {
      await resetPasswordMutation.mutateAsync(data);
      toast.success("E-mail sent, check your email!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Error sending email");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Forgot password?
        </Typography>
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
            label="E-mail"
            name="email"
            placeholder="johndoe@gmail.com"
            autoComplete="email"
            error={errors.email ? true : false}
            helperText={errors.email && errors.email.message}
          />
          <CustomButton
            isSubmitting={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send
          </CustomButton>
        </form>
      </Box>
    </Container>
  );
}
