import { useCustomMutation } from "@/hooks/useCustomMutation";
import ENDPOINTS from "@/services/endpoints";

export function useOffers(selectedOffer) {
    const addOfferMutation = useCustomMutation(ENDPOINTS.offers.root, "post", [
        "offers",
    ]);

    const updateOfferMutation = useCustomMutation(
        ENDPOINTS.offers.offerId(selectedOffer?.id),
        "patch",
        ["offers"]
    );

    const deleteOfferMutation = useCustomMutation(
        ENDPOINTS.offers.offerId(selectedOffer?.id),
        "delete",
        ["offers"]
    );

    return {
        addOfferMutation,
        updateOfferMutation,
        deleteOfferMutation,
    };
}