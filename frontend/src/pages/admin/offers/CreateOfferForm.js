import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useOffers } from '@/hooks/models/userOffers';

const CreateOfferForm = () => {
    const [offerData, setOfferData] = useState({
        name: '',
        coins: '',
        price: '',
    });

    const { addOfferMutation } = useOffers();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOfferData({ ...offerData, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        addOfferMutation.mutate({
            name: offerData.name,
            coins: parseInt(offerData.coins, 10),
            price: parseFloat(offerData.price),
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <TextField
                label="Offer Name"
                name="name"
                value={offerData.name}
                onChange={handleInputChange}
                required
            />
            <TextField
                label="Coins"
                name="coins"
                type="number"
                value={offerData.coins}
                onChange={handleInputChange}
                required
            />
            <TextField
                label="Price"
                name="price"
                type="number"
                value={offerData.price}
                onChange={handleInputChange}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Create Offer
            </Button>
        </form>
    );
};

export default CreateOfferForm;
