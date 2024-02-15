import { useCustomMutation } from "@/hooks/useCustomMutation";
import ENDPOINTS from "@/services/endpoints";

export function useBookings(selectedBookingId) {
  const addBookingMutation = useCustomMutation(ENDPOINTS.bookings.add, "post", [
    "bookings",
    "player",
  ]);

  const cancelBookingMutation = useCustomMutation(
    ENDPOINTS.bookings.cancel(selectedBookingId),
    "delete",
    ["client"]
  );

  return {
    addBookingMutation,
    cancelBookingMutation,
  };
}
