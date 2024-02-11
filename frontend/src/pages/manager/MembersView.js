import { useMembersView } from "@/pages/manager/hooks/useMembersView";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import ManagerPlayerCreateForm from "@/pages/manager/forms/ManagerPlayerCreateForm";
import { useTeams } from "@/hooks/models/useTeams";
import { toast } from "sonner";

function MembersView({ team }) {
  const {
    ACTION_TYPES,
    selectedUser,
    setSelectedUser,
    actionType,
    openDialog,
    handleDialogClose,
    handleActionType,
  } = useMembersView();




  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Typography variant="h4" className="titleBorder">
          Liste des membres
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleActionType(ACTION_TYPES.CREATE_PLAYER)}
          sx={{ mb: 3 }}
        >
          Add player
        </Button>
      </Stack>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        {actionType === ACTION_TYPES.CREATE_PLAYER && (
          <ManagerPlayerCreateForm team={team} handleDialogClose={handleDialogClose} />
        )}
      </Dialog>
    </div>
  );
}

export default MembersView;
