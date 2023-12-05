import React from 'react';
import { useAuthUser } from 'react-auth-kit';
import { Card, CardContent, Typography, Button, Container, Box } from '@mui/material';
import { format } from 'date-fns';

function ProfileView() {
    const auth = useAuthUser();
    const { email, firstName, lastName, phone, createdAt } = auth().user;
    const memberSince = createdAt ? format(new Date(createdAt), 'PP') : 'Date not available';

    return (
        <Container component="main" maxWidth="xs">
            <Box
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
                            Profile
                        </Typography>
                        <Typography variant="body1"><b>Email:</b> {email}</Typography>
                        <Typography variant="body1"><b>First Name:</b> {firstName}</Typography>
                        <Typography variant="body1"><b>Last Name:</b> {lastName}</Typography>
                        <Typography variant="body1"><b>Phone:</b> {phone ?? "Not defined"}</Typography>
                        <Typography variant="body1"><b>Member Since:</b> {memberSince}</Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                        <Button variant="contained" size="small">Edit Profile</Button>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
}

export default ProfileView;
