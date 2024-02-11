import useFetch from "@/hooks/useFetch";
import ManagerTeamView from "@/pages/manager/ManagerTeamView";
import ENDPOINTS from "@/services/endpoints";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";

function ManagerView() {
  const auth = useAuthUser();

  const userId = auth()?.user.id;

  console.log(auth()?.user)

  const { data: managerTeam, isLoading: isLoadingManagerTeam } = useFetch(
    "team",
    ENDPOINTS.teams.manager(userId)
  );

  if (isLoadingManagerTeam) {
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
        <ManagerTeamView team={managerTeam} />
      )}
    </div>
  );
}

export default ManagerView;
