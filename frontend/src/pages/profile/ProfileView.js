import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { Box, Button, Card, CardContent, CircularProgress, Container, Snackbar, Alert as MuiAlert, Stepper, Step, StepButton, Grid, Typography, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import useFetch from "@/hooks/useFetch";
import { useUsers } from "@/hooks/models/useUsers";
import ENDPOINTS from '@/services/endpoints';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(customParseFormat);

function ProfileView() {
    const auth = useAuthUser();
    const { data: user, isLoading: isLoadingUser } = useFetch("user", ENDPOINTS.users.userId(auth().user.id));
    const { updateUserMutation } = useUsers(auth().user.id);
    const isEditable = user?.type === 'client' || user?.type === 'manager';
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { register, handleSubmit, setValue, setError,  formState: { errors } } = useForm();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Profile', 'Stats'];
    const [lastScrollTime, setLastScrollTime] = useState(0);
    const scrollThreshold = 1000;


    const disableScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
        document.body.style.overflow = '';
    };
    useEffect(() => {
        if (user) {
            Object.keys(user).forEach(key => {
                setValue(key, user[key]);
            });
        }
    }, [user, setValue]);

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
            if (error.response && error.response.data && error.response.data.violations) {
                error.response.data.violations.forEach((violation) => {
                    setError(violation.propertyPath, {
                        type: "manual",
                        message: violation.message,
                    });
                });
            }
            console.error('Error updating profile:', error);
            setOpenSnackbar(true);
            setSnackbarMessage("Failed to update profile.");
            setAlertSeverity("error");
        }
    };


    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (isLoadingUser) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', p: 3, alignItems: 'center' }} onWheel={handleScroll} onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
            {!isMobile && (
                <Box sx={{ width: '15%', mr: 2 }}>
                    <Stepper orientation="vertical" nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepButton onClick={() => setActiveStep(index)}>{label}</StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            )}

            <Container component="main" maxWidth="sm">
                <Box sx={{ width: isMobile ? '100%' : '80%' }}>
                    {activeStep === 0 && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6 }}>
                                <Card sx={{ width: '100%', boxShadow: 6, borderRadius: 2 }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h4" component="div" align="center" color="primary">
                                            Profile Information
                                        </Typography>
                                        <Box sx={{ my: 2 }}>
                                            <TextField
                                                label="Email"
                                                {...register("email", { required: "Email is required" })}
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
                                                {...register("username", { required: "Username is required" })}
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
                                                {...register("discord", { required: "Discord is required" })}
                                                margin="normal"
                                                fullWidth
                                                error={!!errors.discord}
                                                helperText={errors.discord?.message}
                                                disabled={!isEditable}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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
                                Stats
                            </Typography>
                            <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Coins: {user?.coins}</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    )}
                </Box>

                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={alertSeverity}>
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </Container>
        </Box>
    );
}

export default ProfileView;
