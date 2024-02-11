import { useCustomMutation } from "@/hooks/useCustomMutation";
import ENDPOINTS from "@/services/endpoints";

export function useRanks(selectedRank) {
  const addRankMutation = useCustomMutation(ENDPOINTS.ranks.root, "post", [
    "games",
  ]);

  const updateRankMutation = useCustomMutation(
    ENDPOINTS.ranks.rankId(selectedRank?.id),
    "patch",
    ["games"]
  );

  const deleteRankMutation = useCustomMutation(
    ENDPOINTS.ranks.rankId(selectedRank?.id),
    "delete",
    ["games"]
  );

  return {
    addRankMutation,
    updateRankMutation,
    deleteRankMutation,
  };
}
