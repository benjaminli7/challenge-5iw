import { useCustomMutation } from "@/hooks/useCustomMutation";
import ENDPOINTS from "@/services/endpoints";

export function useTeams(teamId) {
  const addTeamMutation = useCustomMutation(ENDPOINTS.teams.root, "post", [
    "team",
  ]);

  const updateTeamMutation = useCustomMutation(
    ENDPOINTS.teams.teamId(teamId),
    "patch",
    ["team"]
  );

  const addPlayerMutation = useCustomMutation(
    ENDPOINTS.teams.addPlayer(teamId),
    "post",
    ["team"]
  );

  const approveTeamMutation = useCustomMutation(
    ENDPOINTS.teams.approveTeam(teamId),
    "post",
    ["teams"]
  );

  const withdrawCoinsMutation = useCustomMutation(
    ENDPOINTS.teams.withdrawCoins(teamId),
    "patch",
    ["team"]
  );

  return {
    addTeamMutation,
    updateTeamMutation,
    addPlayerMutation,
    approveTeamMutation,
    withdrawCoinsMutation,
  };
}
