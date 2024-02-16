import { useCustomMutation } from "@/hooks/useCustomMutation";
import { useState } from "react";
import ENDPOINTS from "@/services/endpoints";

export function usePayment(selectedPayment) {
    const addPaymentMutation = useCustomMutation(ENDPOINTS.payments.root, "post", [
        "payments",
    ]);

    const [paymentResponse, setPaymentResponse] = useState(null);

    const processPayment = async (offer, userId) => {
        try {
            const paymentData = {
                user: `/api/users/${userId}`,
                offer: `/api/offers/${offer.id}`,
                amount: offer.price.toString(),
                status: 'pending',
                paymentDate: new Date().toISOString(),
            };

            const response = await addPaymentMutation.mutateAsync(paymentData);

            setPaymentResponse(response);

            console.log(response);

            return response;

        } catch (error) {
            console.error("Error processing payment:", error);
            throw error;
        }
    };


    return {
        processPayment,
        paymentResponse,
    };
}