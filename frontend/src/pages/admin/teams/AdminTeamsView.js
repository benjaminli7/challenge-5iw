import Loader from "@/components/commons/Loader";
import useFetch from "@/hooks/useFetch";
import AdminTeamsList from "@/pages/admin/teams/AdminTeamsList";
import ENDPOINTS from "@/services/endpoints";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";

function AdminTeamsView() {
  const { data: teams, isLoading } = useFetch("teams", ENDPOINTS.teams.root);
  const [teamId, setTeamId] = useState();

  if (isLoading) return <Loader />
  let approvedTeams = teams.filter((team) => team.isApproved === true);
  let notApprovedTeams = teams.filter((team) => team.isApproved === false);

  return (
    <div>
      <Stack spacing={2}>
        <>
          <Typography variant="h4" gutterBottom>
            Pending teams
          </Typography>
          <AdminTeamsList isPendingTeams="true" teamId={teamId} setTeamId={setTeamId} teams={notApprovedTeams} />
        </>
        <>
          <Typography variant="h4" gutterBottom>
            Approved teams
          </Typography>
          <AdminTeamsList teams={approvedTeams} />
        </>
      </Stack>
    </div>
  );
}

export default AdminTeamsView;
