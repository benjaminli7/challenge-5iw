import { useState } from "react";
import useActionHandlers from "@/hooks/useActionHandlers";

export function useMembersView() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { actionType, openDialog, handleDialogClose, handleActionType } =
    useActionHandlers();
  const ACTION_TYPES = {
    CREATE_PLAYER: "CREATE_PLAYER",
    EDIT_PLAYER: "EDIT_PLAYER",
    EDIT_PLAYER_IMAGE: "EDIT_PLAYER_IMAGE",
    EDIT_TEAM_IMAGE: "EDIT_TEAM_IMAGE",
  };
  return {
    ACTION_TYPES,
    selectedUser,
    setSelectedUser,
    actionType,
    openDialog,
    handleDialogClose,
    handleActionType,
  };
}
