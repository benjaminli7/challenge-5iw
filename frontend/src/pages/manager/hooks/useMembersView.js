import { useState } from "react";
import useActionHandlers from "@/hooks/useActionHandlers";

export function useMembersView() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { actionType, openDialog, handleDialogClose, handleActionType } =
    useActionHandlers();
  const ACTION_TYPES = {
    CREATE_PLAYER: "CREATE_PLAYER",
    EDIT_PLAYER: "EDIT_PLAYER",
  };
  return {
    ACTION_TYPES,
    selectedUserId,
    setSelectedUserId,
    actionType,
    openDialog,
    handleDialogClose,
    handleActionType,
  };
}
