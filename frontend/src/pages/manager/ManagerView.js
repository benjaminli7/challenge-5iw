import Loader from "@/components/commons/Loader";
import useFetch from "@/hooks/useFetch";
import ManagerTeamView from "@/pages/manager/ManagerTeamView";
import ENDPOINTS from "@/services/endpoints";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function ManagerView() {
  const auth = useAuthUser();

  const userId = auth().user.id;
  const navigate = useNavigate();

  const { data: managerTeam, isLoading: isLoadingTeam } = useFetch(
    "team",
    ENDPOINTS.teams.manager(userId)
  );

  const { data: games, isLoading: isLoadingGames } = useFetch(
    "games",
    ENDPOINTS.games.root
  );

  if (isLoadingTeam && isLoadingGames) {
    return <Loader />
  }

  if (managerTeam?.errorMessage) {
    navigate("/my-team/create");
  }

  return (
    <div>
      <ManagerTeamView team={managerTeam} games={games} />
    </div>
  );
}

export default ManagerView;
