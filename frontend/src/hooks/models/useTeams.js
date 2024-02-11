import { useCustomMutation } from "@/hooks/useCustomMutation";
import ENDPOINTS from "@/services/endpoints";

export function useTeams(teamId) {
  // const {
  //   data: teams,
  //   isError,
  //   error,
  //   isLoading,
  // } = useFetch("teams", ENDPOINTS.teams.root);

  // const {
  //   data: team,
  //   isError: isErrorTeam,
  //   error: errorTeam,
  //   isLoading: isLoadingTeam,
  // } = useFetch("team", ENDPOINTS.teams.teamId(teamId));

  // const {
  //   data: managerTeam,
  //   isError: isErrorManagerTeam,
  //   error: errorManagerTeam,
  //   isLoading: isLoadingManagerTeam,
  // } = useFetch("team", ENDPOINTS.teams.manager(managerId));

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

  return {
    addTeamMutation,
    updateTeamMutation,
    addPlayerMutation,
  };
}
