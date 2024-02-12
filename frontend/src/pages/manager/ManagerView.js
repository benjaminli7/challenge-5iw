import useFetch from "@/hooks/useFetch";
import ManagerTeamView from "@/pages/manager/ManagerTeamView";
import ENDPOINTS from "@/services/endpoints";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";

function ManagerView() {
  const auth = useAuthUser();

  const userId = auth().user.id;

  const { data: managerTeam, isLoading: isLoadingTeam } = useFetch(
    "team",
    ENDPOINTS.teams.manager(userId)
  );

  const { data: games, isLoading: isLoadingGames } = useFetch(
    "games",
    ENDPOINTS.games.root
  );

  if (isLoadingTeam && isLoadingGames) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {managerTeam?.errorMessage ? (
        <div>
          <h1>Manager View</h1>
          <p>You don't have a team yet!</p>
          <Link to="/my-team/create">Create a team</Link>
        </div>
      ) : (
        <ManagerTeamView team={managerTeam} games={games} />
      )}
    </div>
  );
}

export default ManagerView;
