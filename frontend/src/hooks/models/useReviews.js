import { useCustomMutation } from "@/hooks/useCustomMutation";
import ENDPOINTS from "@/services/endpoints";

export function useReviews() {
  const addReviewMutation = useCustomMutation(ENDPOINTS.reviews.root, "post", [
    "review",
  ]);

  return {
    addReviewMutation,
  };
}
