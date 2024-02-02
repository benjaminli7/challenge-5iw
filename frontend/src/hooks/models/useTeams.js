import ENDPOINTS from "@/services/endpoints";
import useFetch from "@/hooks/useFetch";

export function useTeams() {
  const {
    data: teams,
    isError,
    error,
    isLoading,
  } = useFetch("teams", ENDPOINTS.teams.root);

  return {
    teams,
    isError,
    error,
    isLoading,
  };
}
