import CustomButton from "@/components/commons/CustomButton";
import { useTeams } from "@/hooks/models/useTeams";
import useActionHandlers from "@/hooks/useActionHandlers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { toast } from "sonner";
import AdminTeamsTable from "./tables/AdminTeamsTable";

function AdminTeamsList({ teams, teamId, setTeamId, isPendingTeams }) {
  const { approveTeamMutation } = useTeams(teamId);
  const { openDialog, handleDialogClose, handleOpenDialog } =
    useActionHandlers();

  const handleApproveTeam = async () => {
    try {
      await approveTeamMutation.mutateAsync({});
      await handleDialogClose();
      toast.success("approved!");
    } catch (error) {
      console.error("Error approving team:", error);
      toast.error("error approving!");
    }
  };

  return (
    <div>
      {teams.length === 0 && <div>No teams to display</div>}
      {teams.length > 0 &&
        teams.map((team) => (
          <Accordion key={team.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              {team.name}
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6">Manager</Typography>
              <AdminTeamsTable manager={team.manager} />
              {team.boosters && (
                <>
                  <Typography variant="h6">Joueurs</Typography>
                  <AdminTeamsTable players={team.boosters} />
                </>
              )}
            </AccordionDetails>
            {isPendingTeams && (
              <AccordionActions>
                <CustomButton
                  variant="contained"
                  onClick={() => {
                    handleOpenDialog();
                    setTeamId(team.id);
                  }}
                >
                  Approve
                </CustomButton>
              </AccordionActions>
            )}
          </Accordion>
        ))}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogContent>Do you want to approve this team ?</DialogContent>
        <DialogActions>
          <CustomButton variant="contained" onClick={handleDialogClose}>
            No
          </CustomButton>
          <CustomButton
            variant="contained"
            onClick={handleApproveTeam}
            isSubmitting={approveTeamMutation.isLoading}
          >
            Yes
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminTeamsList;
