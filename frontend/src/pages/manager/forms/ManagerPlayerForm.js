import React from 'react'
import { useForm } from "react-hook-form";
import CustomButton from "@/components/commons/CustomButton";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import CustomSelectForm from '@/components/commons/CustomSelectForm';
import useFetch from '@/hooks/useFetch';
import ENDPOINTS from "@/services/endpoints";

function ManagerPlayerForm({
  deletePlayerMutation,
  handleDeleteUser,
  selectedUser,
  onSubmit,
  actionType,
}) {
  const {
    data: games,
    isError,
    error,
    isLoading,
  } = useFetch("games", ENDPOINTS.games.root);
  const defaultValues = {
    email: selectedUser?.email || "",
    firstName: selectedUser?.firstName || "",
    lastName: selectedUser?.lastName || "",
    game: selectedUser?.game || "",
    plainPassword: selectedUser?.plainPassword || "",
    discord: selectedUser?.discord || "",
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>
        {actionType === "create" ? "Create a new game" : "Edit game"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              disabled={actionType === "update"}
              autoComplete="given-name"
              name="email"
              required
              fullWidth
              id="email"
              label="Email"
              placeholder="johndoe@gmail.com"
              autoFocus
              error={errors.email ? true : false}
              helperText={errors.email && errors.email.message}
            />
          </Grid>
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
              label="First name"
              placeholder="John"
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
              autoComplete="given-name"
              name="lastName"
              required
              fullWidth
              id="lastName"
              label="Last name"
              placeholder="Doe"
              autoFocus
              error={errors.lastName ? true : false}
              helperText={errors.lastName && errors.lastName.message}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomSelectForm
              id="game"
              name="game"
              label="Game"
              control={control}
              fullWidth
            ></CustomSelectForm>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <CustomButton
          type="submit"
          variant="contained"
          isSubmitting={isSubmitting}
        >
          Submit
        </CustomButton>
        {actionType === "update" && (
          <CustomButton
            type="button"
            isSubmitting={deletePlayerMutation.isLoading}
            onClick={handleDeleteUser}
            variant="contained"
            color="error"
          >
            Delete
          </CustomButton>
        )}
      </DialogActions>
    </form>
  );
}

export default ManagerPlayerForm