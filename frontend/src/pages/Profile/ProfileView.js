import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { Card, CardContent, Typography, TextField, Button, Container, Box, Snackbar, Alert as MuiAlert, Stepper, Step, StepButton, CardHeader, Grid, useMediaQuery, useTheme } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { httpPatch } from '@/services/api';
import Cookies from 'js-cookie';
import ENDPOINTS from '@/services/endpoints';

dayjs.extend(customParseFormat);

function ProfileView() {
    const [errors, setErrors] = useState({});
    const auth = useAuthUser();
    const [formState, setFormState] = useState(auth().user);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Profile', 'Stats', 'Schedule'];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [events, setEvents] = useState({
        '2023-01-01': [{ title: 'Nouvel An', description: 'Célébration du Nouvel An', date: '2023-01-01' }],
        '2024-01-01': [{ title: 'Nouvel An', description: 'Célébration du Nouvel An', date: '2024-01-01' }],
        '2025-01-02': [{ title: 'Nouvel An', description: 'Célébration du Nouvel An', date: '2025-01-01' }],
        '2025-01-03': [{ title: 'Nouvel An', description: 'Célébration du Nouvel An', date: '2025-01-01' }],
        '2025-01-04': [{ title: 'Nouvel An', description: 'Célébration du Nouvel An', date: '2025-01-01' }],
        '2025-01-05': [{ title: 'Nouvel An', description: 'Célébration du Nouvel An', date: '2025-01-01' }],
        '2025-01-06': [{ title: 'Nouvel An', description: 'Célébration du Nouvel An', date: '2025-01-01' }],
        '2025-01-07': [{ title: 'Nouvel An', description: 'Célébration du Nouvel An', date: '2025-01-01' }],
        '2025-01-08': [{ title: 'Nouvel An', description: 'Célébration du Nouvel An', date: '2025-01-01' }],
        '2025-01-09': [{ title: 'Nouvel An', description: 'Célébration du Nouvel An', date: '2025-01-01' }],

    });

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const upcomingEvents = Object.keys(events).reduce((acc, date) => {
        if (dayjs(date).isAfter(dayjs(), 'day')) {
            acc[date] = events[date];
        }
        return acc;
    }, {});

    const [lastScrollTime, setLastScrollTime] = useState(0);
    const scrollThreshold = 1000
    const disableScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
        document.body.style.overflow = '';
    };
    const handleEventScrollCards = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const authCookie = Cookies.get('_auth_state');
        if (authCookie) {
            const parsedCookie = JSON.parse(authCookie);
            setFormState(parsedCookie.user);
        }
    }, []);

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
            setActiveStep(newStep);
            window.scrollTo(0, 0);
        }

        setLastScrollTime(now);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = formState.id;

        if (userId) {
            try {
                const response = await httpPatch(
                    ENDPOINTS.users.userId(userId),
                    formState,
                    { headers: { 'Content-Type': 'application/merge-patch+json' } }
                );

                const updatedUserData = response.data;
                let authCookie = Cookies.get('_auth_state');
                if (authCookie) {
                    authCookie = JSON.parse(authCookie);
                    authCookie.user = { ...authCookie.user, ...updatedUserData };
                     Cookies.set('_auth_state', JSON.stringify(authCookie));
                }
                setFormState(updatedUserData);
                setSnackbarMessage('Profile updated successfully!');
                setAlertSeverity('success');
                setOpenSnackbar(true);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.violations) {
                    const newErrors = {};
                    error.response.data.violations.forEach(violation => {
                        newErrors[violation.propertyPath] = violation.message;
                    });
                    setErrors(newErrors);
                }
                setSnackbarMessage('Failed to update profile.');
                setAlertSeverity('error');
                setOpenSnackbar(true);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', p: 3, alignItems: 'center'}} onWheel={handleScroll} onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
            {!isMobile && (
                <Box sx={{ width: '15%', mr: 2 }}>
                    <Stepper orientation="vertical" nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepButton onClick={() => handleStepChange(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            )}

            <Container component="main" maxWidth="sm">
                <Box sx={{ width: isMobile ? '100%' : '80%' }}>
                    {activeStep === 0 && (
                        <form onSubmit={handleSubmit}>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6}}>
                                <Card sx={{width: '100%', boxShadow: 3}}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" align="center">
                                            Profile
                                        </Typography>
                                        <TextField label="Email" name="email" value={formState.email}
                                                   onChange={handleChange} margin="normal" fullWidth disabled/>
                                        <TextField error={!!errors.firstName} helperText={errors.firstName}
                                                   label="First Name" name="firstName" value={formState.firstName}
                                                   onChange={handleChange} margin="normal" fullWidth/>
                                        <TextField error={!!errors.lastName} helperText={errors.lastName}
                                                   label="Last Name" name="lastName" value={formState.lastName}
                                                   onChange={handleChange} margin="normal" fullWidth/>
                                        <TextField error={!!errors.phone} helperText={errors.phone || ''} label="Phone"
                                                   name="phone" value={formState.phone || ''} onChange={handleChange}
                                                   margin="normal" fullWidth/>
                                    </CardContent>
                                    <Box sx={{display: 'flex', justifyContent: 'center', pb: 2}}>
                                        <Button type="submit" variant="contained" size="small">Save Changes</Button>
                                    </Box>
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
                                <Grid item xs sx={{ display: 'inline-flex', flexWrap: 'wrap' }}>
                                    <Card sx={{ mb: 2, flexGrow: 1, minWidth: '150px' }}>
                                        <CardHeader title="Email" subheader={formState.email} />
                                    </Card>
                                </Grid>
                                <Grid item xs sx={{ display: 'inline-flex', flexWrap: 'wrap' }}>
                                    <Card sx={{ mb: 2, flexGrow: 1, minWidth: '150px' }}>
                                        <CardHeader title="First Name" subheader={formState.firstName} />
                                    </Card>
                                </Grid>
                                <Grid item xs sx={{ display: 'inline-flex', flexWrap: 'wrap' }}>
                                    <Card sx={{ mb: 2, flexGrow: 1, minWidth: '150px' }}>
                                        <CardHeader title="Last Name" subheader={formState.lastName} />
                                    </Card>
                                </Grid>
                                <Grid item xs sx={{ display: 'inline-flex', flexWrap: 'wrap' }}>
                                    <Card sx={{ mb: 2, flexGrow: 1, minWidth: '150px' }}>
                                        <CardHeader title="Phone" subheader={formState.phone} />
                                    </Card>
                                </Grid>
                            </Grid>
                        </Card>

                    )}

                    {activeStep === 2 && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mt: 2 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {!isMobile && (
                                    <Box sx={{ flex: 1, pr: 4, alignSelf: 'center',  ml: '-100px'}}>
                                        <DateCalendar value={selectedDate} onChange={handleDateChange} />
                                    </Box>
                                )}
                                <Box sx={{ flex: 2, overflowY: 'auto', maxHeight: '400px', minWidth: '300px' }} onWheel={handleEventScrollCards}>
                                    {Object.entries(upcomingEvents).map(([date, events], index) => (
                                        events.map((event, eventIndex) => (
                                            <Card key={`${index}-${eventIndex}`} sx={{ mb: 2, minWidth: '300px' }}>
                                                <CardHeader title={event.title} subheader={event.description} />
                                            </Card>
                                        ))
                                    ))}
                                </Box>
                            </LocalizationProvider>
                        </Box>
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