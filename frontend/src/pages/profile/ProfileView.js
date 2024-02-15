import { useUsers } from "@/hooks/models/useUsers";
import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Alert as MuiAlert,
  Select,
  Snackbar,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useForm } from "react-hook-form";

dayjs.extend(customParseFormat);

function ProfileView() {
  const auth = useAuthUser();
  const [shouldReload, setShouldReload] = useState(false);
  const {
    data: user,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useFetch("user", ENDPOINTS.users.userId(auth().user.id));
  const { data: existingGames, isLoading: isLoadingGames } = useFetch(
    "games",
    ENDPOINTS.games.root
  );
  console.log(existingGames);
  const { updateUserMutation } = useUsers(auth().user.id);

  const isEditable = user?.type === "client" || user?.type === "manager";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Profile", "Stats"];

  const [openAddGameDialog, setOpenAddGameDialog] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);

  const [lastScrollTime, setLastScrollTime] = useState(0);
  const scrollThreshold = 1000;

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  const handleScroll = (e) => {
    const now = Date.now();

    if (now - lastScrollTime < scrollThreshold) {
      return;
    }

    let newStep = activeStep;
    if (e.deltaY < 0 && activeStep > 0) {
      newStep = activeStep - 1;
    } else if (e.deltaY > 0 && activeStep < steps.length - 1) {
      newStep = activeStep + 1;
    }
    if (newStep !== activeStep) {
      const handleStepChange = (step) => {
        setActiveStep(step);
      };
      const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
          setErrors({ ...errors, [e.target.name]: null });
        }
      };
      setActiveStep(newStep);
      window.scrollTo(0, 0);
    }

    setLastScrollTime(now);
  };

  const onSubmit = async (data) => {
    try {
      await updateUserMutation.mutateAsync(data);
      setOpenSnackbar(true);
      setSnackbarMessage("Profile updated successfully!");
      setAlertSeverity("success");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.violations
      ) {
        error.response.data.violations.forEach((violation) => {
          setError(violation.propertyPath, {
            type: "manual",
            message: violation.message,
          });
        });
      }
      console.error("Error updating profile:", error);
      setOpenSnackbar(true);
      setSnackbarMessage("Failed to update profile.");
      setAlertSeverity("error");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenAddGameDialog = () => setOpenAddGameDialog(true);
  const handleCloseAddGameDialog = () => setOpenAddGameDialog(false);

  const handleGameChange = (event) => {
    const gameId = event.target.value;
    const game = existingGames.find((g) => g.id === gameId);
    setSelectedGame(game);
    setSelectedRank(null);
  };

  const handleRankChange = (event) => {
    const rankId = event.target.value;
    const rank = selectedGame.ranks.find((r) => r.id === rankId);
    setSelectedRank(rank);
  };

  useEffect(() => {
    if (shouldReload) {
      refetchUser();
      setShouldReload(false);
    }
  }, [shouldReload, refetchUser]);

  const submitGameRank = async () => {
    if (!selectedRank) {
      console.error("No rank selected");
      return;
    }
    const rankIRI = `${ENDPOINTS.ranks.root}/${selectedRank.id}`;

    const currentRankIRIs = user.rankIRIs ? [...user.rankIRIs] : [];

    if (!currentRankIRIs.includes(rankIRI)) {
      currentRankIRIs.push(rankIRI);

      try {
        await updateUserMutation.mutateAsync({
          id: user.id,
          rankIRIs: currentRankIRIs,
        });
        setOpenSnackbar(true);
        setSnackbarMessage("Game rank added successfully!");
        setAlertSeverity("success");
        handleCloseAddGameDialog();
        setShouldReload(true);
      } catch (error) {
        console.error("Error updating game rank:", error);
        setOpenSnackbar(true);
        setSnackbarMessage("Failed to add game rank.");
        setAlertSeverity("error");
      }
    } else {
      console.log("Rank already added");
    }
  };

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => {
        setValue(key, user[key]);
      });
    }
  }, [user, setValue]);

  if (isLoadingUser || isLoadingGames) {
    return <CircularProgress />;
  }

  const gameRanks =
    user?.rankIRIs?.reduce((acc, rankIRI) => {
      const rankId = parseInt(rankIRI.split("/").pop());
      existingGames.forEach((game) => {
        const foundRank = game.ranks.find((rank) => rank.id === rankId);
        if (foundRank) {
          if (!acc[game.name]) {
            acc[game.name] = { gameName: game.name, ranks: [] };
          }
          acc[game.name].ranks.push(foundRank.name);
        }
      });
      return acc;
    }, {}) || {};

  const gameRanksArray = Object.values(gameRanks);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        p: 3,
        alignItems: "center",
      }}
      onWheel={handleScroll}
      onMouseEnter={disableScroll}
      onMouseLeave={enableScroll}
    >
      {!isMobile && (
        <Box sx={{ width: "15%", mr: 2 }}>
          <Stepper orientation="vertical" nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton onClick={() => setActiveStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
      )}

      <Container component="main" maxWidth="sm">
        <Box sx={{ width: isMobile ? "100%" : "80%" }}>
          {activeStep === 0 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 6,
                }}
              >
                <Card sx={{ width: "100%", boxShadow: 6, borderRadius: 2 }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      align="center"
                      color="primary"
                    >
                      Profile Information
                    </Typography>
                    <Box sx={{ my: 2 }}>
                      <TextField
                        label="Email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        margin="normal"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        disabled
                      />
                    </Box>
                    <Box sx={{ my: 2 }}>
                      <TextField
                        label="Username"
                        {...register("username", {
                          required: "Username is required",
                        })}
                        margin="normal"
                        fullWidth
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        disabled={!isEditable}
                      />
                    </Box>
                    <Box sx={{ my: 2 }}>
                      <TextField
                        label="Discord"
                        {...register("discord", {
                          required: "Discord is required",
                        })}
                        margin="normal"
                        fullWidth
                        error={!!errors.discord}
                        helperText={errors.discord?.message}
                        disabled={!isEditable}
                      />
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mt: 4 }}
                    >
                      {isEditable && (
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          disabled={!isEditable}
                          size="large"
                        >
                          Save Changes
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </form>
          )}

          {activeStep === 1 && (
            <Card sx={{ mt: 8, p: 3 }}>
              <Typography gutterBottom variant="h5" align="center">
                Stats and Games
              </Typography>
              <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                Coins: {user?.coins}
              </Typography>
              <Grid container spacing={2}>
                {gameRanksArray.map((game, index) => (
                  <Grid item xs={12} key={index}>
                    <Card sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="h6">{game.gameName}</Typography>
                        {game.ranks.map((rank, rankIndex) => (
                          <Typography key={rankIndex} sx={{ ml: 2 }}>
                            - Rank: {rank}
                          </Typography>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <Grid
                  item
                  xs={12}
                  sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAddGameDialog}
                  >
                    Add Game Rank
                  </Button>
                </Grid>
              </Grid>
            </Card>
          )}

          <Dialog open={openAddGameDialog} onClose={handleCloseAddGameDialog}>
            <DialogTitle>Add Game Rank</DialogTitle>
            <DialogContent>
              <FormControl fullWidth>
                <InputLabel>Game</InputLabel>
                <Select
                  value={selectedGame?.id || ""}
                  label="Game"
                  onChange={handleGameChange}
                >
                  {existingGames.map((game) => (
                    <MenuItem key={game.id} value={game.id}>
                      {game.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedGame && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Rank</InputLabel>
                  <Select
                    value={selectedRank?.id || ""}
                    label="Rank"
                    onChange={handleRankChange}
                  >
                    {selectedGame.ranks.map((rank) => (
                      <MenuItem key={rank.id} value={rank.id}>
                        {rank.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAddGameDialog}>Cancel</Button>
              <Button onClick={submitGameRank}>Add</Button>
            </DialogActions>
          </Dialog>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity={alertSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default ProfileView;
