import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthUser } from "react-auth-kit";
import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { Card, CardContent, Typography, Button, Snackbar, Container, Grid} from '@mui/material';
import { usePayment } from "@/hooks/models/usePayment";
import { useCustomMutation } from "@/hooks/useCustomMutation";

const stripePromise = loadStripe('pk_test_51NWhaQBS812DNqMjMpIqeLQEP5wSNeht3MpufatBZCAX4aLD0RfSnteFshIEoBXzmhTTasJ9JVK2mERRkhRE0K0r00D1p0P7lP');

const PurchaseCoins = () => {
    const auth = useAuthUser();
    const { data: user, isLoading: isLoadingUser } = useFetch("user", ENDPOINTS.users.userId(auth().user.id));
    const { data: existingOffers, isLoading: isLoadingOffers } = useFetch("offers", ENDPOINTS.offers.root);
    const { processPayment, paymentResponse } = usePayment();

    const location = useLocation();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paymentResult = queryParams.get('paymentResult');

        if (paymentResult === 'success') {
            setSnackbarMessage('Payment successful!');
            setSnackbarOpen(true);
        } else if (paymentResult === 'cancel') {
            setSnackbarMessage('Payment cancelled!');
            setSnackbarOpen(true);
        }
    }, [location]);

    const handleBuyNow = async (offer) => {
        try {
            const paymentResponse = await processPayment(offer, auth().user.id);
            const stripe = await stripePromise;

            if (paymentResponse.sessionId) {
                const { error } = await stripe.redirectToCheckout({
                    sessionId: paymentResponse.sessionId,
                });
                if (error) {
                    console.error("Error redirecting to checkout:", error);
                } else {
                    const response = await useCustomMutation(ENDPOINTS.confirm_payment.root, {
                        userId: auth().user.id,
                        offerId: offer.id,
                    });
                    console.log('User information updated successfully:', response.data);
                }
            } else {
                console.error("No session ID returned from the server.");
            }
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };

    if (isLoadingUser || isLoadingOffers) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom sx={{ my: 4 }}>
                Purchase Coins
            </Typography>
            <Grid container spacing={3}>
                {existingOffers.map((offer, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" component="div" align="center">{offer.name}</Typography>
                                <Typography color="text.secondary" align="center">{offer.coins} Coins</Typography>
                                <Typography color="text.secondary" align="center">Price: ${offer.price}</Typography>
                                <Button variant="contained" color="primary" onClick={() => handleBuyNow(offer)} sx={{ mt: 2, display: 'block', margin: '0 auto' }}>
                                    Buy Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
        </Container>
    );

};

export default PurchaseCoins;