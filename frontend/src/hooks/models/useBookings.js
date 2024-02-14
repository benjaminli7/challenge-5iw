import { useCustomMutation } from "@/hooks/useCustomMutation";
import ENDPOINTS from "@/services/endpoints";

export function useBookings() {
  const addBookingMutation = useCustomMutation(ENDPOINTS.bookings.add, "post", [
    "bookings",
    "player",
  ]);

  return {
    addBookingMutation,
  };
}
