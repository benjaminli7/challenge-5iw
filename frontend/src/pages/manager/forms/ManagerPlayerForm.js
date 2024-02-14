import CustomButton from "@/components/commons/CustomButton";
import CustomSelectForm from "@/components/commons/CustomSelectForm";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Input,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";

function ManagerPlayerForm({
  deleteUserMutation,
  handleDeletePlayer,
  selectedUser,
  onSubmit,
  actionType,
  games,
  setLatLng,
  latLng,
}) {
  const defaultValues = {
    email: selectedUser?.email || "",
    username: selectedUser?.username || "",
    firstName: selectedUser?.firstName || "",
    lastName: selectedUser?.lastName || "",
    assignedGame: selectedUser?.assignedGame.id || "",
    discord: selectedUser?.discord || "",
    tauxHoraire: selectedUser?.taux_horaire || "",
    address: selectedUser?.address || "",
  };

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  const { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      setLatLng({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>
        {actionType === "create" ? "Add a new player" : "Edit player"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
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
          <Grid item xs={12}>
            <TextField
              {...register("username", {
                required: "Username is required",
              })}
              disabled={actionType === "update"}
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
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("firstName", {
                required: "First name is required",
              })}
              disabled={actionType === "update"}
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
              disabled={actionType === "update"}
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
            <div>
              <span>Ville </span>
              <TextField
                fullWidth
                variant="outlined"
                inputRef={materialRef}
                {...register("address")}
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("tauxHoraire", {
                required: "Taux Horaire is required",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/i,
                  message: "Invalid taux horaire",
                },
              })}
              required
              fullWidth
              id="tauxHoraire"
              label="Taux Horaire"
              name="tauxHoraire"
              autoComplete="tauxHoraire"
              placeholder="0.00"
              error={errors.tauxHoraire ? true : false}
              helperText={errors.tauxHoraire && errors.tauxHoraire.message}
            />
          </Grid>
          {actionType === "create" && (
            <>
              <Grid item xs={12}>
                <TextField
                  {...register("plainPassword", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                  required
                  fullWidth
                  name="plainPassword"
                  label="Password"
                  type="password"
                  id="plainPassword"
                  placeholder="********"
                  error={errors.plainPassword ? true : false}
                  helperText={
                    errors.plainPassword && errors.plainPassword.message
                  }
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
                  placeholder="********"
                  autoComplete="new-password"
                  error={errors.confirmPassword ? true : false}
                  helperText={
                    errors.confirmPassword && errors.confirmPassword.message
                  }
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <CustomSelectForm
              id="assignedGame"
              name="assignedGame"
              label="Game"
              control={control}
              required
              fullWidth
            >
              {games?.map((game) => (
                <MenuItem key={game.id} value={game.id}>
                  {game.name}
                </MenuItem>
              ))}
            </CustomSelectForm>
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
            isSubmitting={deleteUserMutation.isLoading}
            onClick={handleDeletePlayer}
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

export default ManagerPlayerForm;
