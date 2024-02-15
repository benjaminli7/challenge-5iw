import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthUser } from "react-auth-kit";
import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { Card, CardContent, Typography, Button } from '@mui/material';
import { usePayment } from "@/hooks/models/usePayment";

const stripePromise = loadStripe('pk_test_51NWhaQBS812DNqMjMpIqeLQEP5wSNeht3MpufatBZCAX4aLD0RfSnteFshIEoBXzmhTTasJ9JVK2mERRkhRE0K0r00D1p0P7lP');

const PurchaseCoins = () => {
    const auth = useAuthUser();
    const { data: user, isLoading: isLoadingUser } = useFetch("user", ENDPOINTS.users.userId(auth().user.id));
    const { data: existingOffers, isLoading: isLoadingOffers } = useFetch("offers", ENDPOINTS.offers.root);
    const { processPayment, paymentResponse } = usePayment(); 

    useEffect(() => {
    }, [paymentResponse]);

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
        <div>
            <Typography variant="h4" gutterBottom>
                Purchase Coins
            </Typography>
            {existingOffers.map((offer, index) => (
                <Card key={index} sx={{ maxWidth: 300, margin: '10px' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {offer.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {offer.coins} Coins
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Price: ${offer.price}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => handleBuyNow(offer)}>
                            Buy Now
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default PurchaseCoins;
