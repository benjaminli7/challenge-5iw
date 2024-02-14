import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('YOUR_PUBLIC_STRIPE_KEY');

const PurchaseCoins = () => {
    const [offers, setOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Fetch the offers from your API
        const fetchOffers = async () => {
            const response = await fetch('/api/offers');
            const data = await response.json();
            setOffers(data);
        };

        fetchOffers();
    }, []);

    const handleChangeOffer = (offerId) => {
        setSelectedOffer(offerId);
        // Create PaymentIntent on the server and get the clientSecret
        const createPaymentIntent = async () => {
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ offerId }),
            });
            const data = await response.json();
            setClientSecret(data.clientSecret);
        };

        createPaymentIntent();
    };

    return (
        <div>
            <h2>Purchase Coins</h2>
            <ul>
                {offers.map((offer) => (
                    <li key={offer.id}>
                        <button onClick={() => handleChangeOffer(offer.id)}>
                            Buy {offer.coins} coins for {offer.price}$
                        </button>
                    </li>
                ))}
            </ul>
            {clientSecret && (
                <Elements stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} />
                </Elements>
            )}
        </div>
    );
};

const CheckoutForm = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    // Add billing details here
                },
            },
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment successful!');
                // Update the user's coins balance by calling your API
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
        </form>
    );
};

export default PurchaseCoins;
