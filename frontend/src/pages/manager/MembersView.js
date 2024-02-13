import ManagerPlayerCreateForm from "@/pages/manager/forms/ManagerPlayerCreateForm";
import { useMembersView } from "@/pages/manager/hooks/useMembersView";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import InputFileUpload from "@/components/commons/InputFileUpload";
import ManagerPlayerList from "@/pages/manager/ManagerPlayerList";
import ManagerPlayerUpdateForm from "@/pages/manager/forms/ManagerPlayerUpdateForm";
import ENDPOINTS from "@/services/endpoints";
import { httpPostMultiPart } from "@/services/api";
import { useQueryClient } from "react-query";

function MembersView({ team, games }) {
  const queryClient = useQueryClient();
  const {
    ACTION_TYPES,
    selectedUser,
    setSelectedUser,
    actionType,
    openDialog,
    handleDialogClose,
    handleActionType,
  } = useMembersView();

  const handleImageUpload = async (
    data,
    setFile,
    ressource,
    handleDialogClose,
    type
  ) => {
    try {
      let response = null;
      if (type == "player_img") {
        response = await httpPostMultiPart(
          ENDPOINTS.users.userImg(ressource.id),
          data
        );
      }
      setFile(null);
      handleDialogClose();
      await queryClient.invalidateQueries("team");
    } catch (error) {
      console.log(error);
    }
  };
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
      <ManagerPlayerList
        players={team.boosters}
        setSelectedUser={setSelectedUser}
        ACTION_TYPES={ACTION_TYPES}
        handleActionType={handleActionType}
      />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        {actionType === ACTION_TYPES.CREATE_PLAYER && (
          <ManagerPlayerCreateForm
            team={team}
            handleDialogClose={handleDialogClose}
            games={games}
          />
        )}
        {actionType === ACTION_TYPES.EDIT_PLAYER && (
          <ManagerPlayerUpdateForm
            selectedUser={selectedUser}
            handleDialogClose={handleDialogClose}
            games={games}
          />
        )}
        {actionType === ACTION_TYPES.EDIT_PLAYER_IMAGE && (
          <InputFileUpload
            handleDialogClose={handleDialogClose}
            ressource={selectedUser}
            handleImageUpload={handleImageUpload}
            type={"player_img"}
          />
        )}
      </Dialog>
    </div>
  );
}

export default MembersView;
