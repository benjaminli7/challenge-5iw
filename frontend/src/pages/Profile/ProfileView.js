import React, {useEffect, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import { Card, CardContent, Typography, Button, Container, Box } from '@mui/material';
import { format } from 'date-fns';
import Cookies from "js-cookie";

function ProfileView() {
    const auth = useAuthUser();

    const [userData, setUserData] = useState(auth().user);

    useEffect(() => {
        const authCookie = Cookies.get('_auth_state');
        if (authCookie) {
            const parsedCookie = JSON.parse(authCookie);
            setUserData(parsedCookie.user);
        }
    }, []);
    const { email, firstName, lastName, phone, createdAt } = userData;
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
                    </Box>
                </Card>
            </Box>
        </Container>
    );
}

export default ProfileView;
