import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { Card, CardContent, Typography, TextField, Button, Container, Box, Snackbar, Alert as MuiAlert } from '@mui/material';
import { httpPatch } from '@/services/api';
import Cookies from 'js-cookie';
import ENDPOINTS from '@/services/endpoints';

function ProfileView() {
    const [errors, setErrors] = useState({});
    const auth = useAuthUser();
    const [formState, setFormState] = useState(auth().user);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    useEffect(() => {
        const authCookie = Cookies.get('_auth_state');
        if (authCookie) {
            const parsedCookie = JSON.parse(authCookie);
            setFormState(parsedCookie.user);
        }
    }, []);

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
        <Container component="main" maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                    <Card sx={{ width: '100%', boxShadow: 3 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" align="center">
                                Profile
                            </Typography>
                            <TextField label="Email" name="email" value={formState.email} onChange={handleChange} margin="normal" fullWidth disabled/>
                            <TextField error={!!errors.firstName} helperText={errors.firstName} label="First Name" name="firstName" value={formState.firstName} onChange={handleChange} margin="normal" fullWidth />
                            <TextField error={!!errors.lastName} helperText={errors.lastName} label="Last Name" name="lastName" value={formState.lastName} onChange={handleChange} margin="normal" fullWidth />
                            <TextField error={!!errors.phone} helperText={errors.phone || ''} label="Phone" name="phone" value={formState.phone || ''} onChange={handleChange} margin="normal" fullWidth />
                        </CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                            <Button type="submit" variant="contained" size="small">Save Changes</Button>
                        </Box>
                    </Card>
                </Box>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={alertSeverity}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
}

export default ProfileView;
