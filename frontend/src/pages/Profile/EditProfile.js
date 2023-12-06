import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser, useAuthHeader } from 'react-auth-kit';
import { httpPatch } from '@/services/api';
import Cookies from 'js-cookie';
import ENDPOINTS from '@/services/endpoints';
import { Card, CardContent, Typography, TextField, Button, Container, Box } from '@mui/material';

function EditProfile() {
    const auth = useAuthUser();
    const authHeader = useAuthHeader();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { email, firstName, lastName, phone } = auth().user;
    const [formState, setFormState] = useState({ email, firstName, lastName, phone });

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = auth().user.id;

        if (userId) {
            try {
                const response = await httpPatch(
                    ENDPOINTS.users.userId(userId),
                    formState,
                    { headers: { Authorization: authHeader(), 'Content-Type': 'application/merge-patch+json' } }
                );

                const updatedUserData = response.data;

                let authCookie = Cookies.get('_auth_state');
                console.log(authCookie);
                if (authCookie) {
                    authCookie = JSON.parse(authCookie);

                    authCookie.user = { ...authCookie.user, ...updatedUserData };

                    Cookies.set('_auth_state', JSON.stringify(authCookie));
                }

                navigate('/profile');

            } catch (error) {
                setError(error?.response?.data?.message || "An unknown error occurred.");
            }
        } else {
            setError("User ID is undefined.");
        }
    };








    return (
        <Container component="main" maxWidth="xs">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8,
                }}
            >
                <Card sx={{ width: '100%', boxShadow: 3 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="center">
                            Edit Profile
                        </Typography>
                        <TextField fullWidth label="Email" name="email" value={formState.email} onChange={handleChange} margin="normal" />
                        <TextField fullWidth label="First Name" name="firstName" value={formState.firstName} onChange={handleChange} margin="normal" />
                        <TextField fullWidth label="Last Name" name="lastName" value={formState.lastName} onChange={handleChange} margin="normal" />
                        <TextField fullWidth label="Phone" name="phone" value={formState.phone || ''} onChange={handleChange} margin="normal" />
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                        <Button type="submit" variant="contained" size="small">Save Changes</Button>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
}

export default EditProfile;