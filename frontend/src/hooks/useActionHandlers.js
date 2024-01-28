import useFormDialog from "./useFormDialog";
import { useState } from "react";

export default function useActionHandlers(selectedElementInitialValue = []) {
  const [selectedElement, setSelectedElement] = useState(
    selectedElementInitialValue
  );
  const [actionType, setActionType] = useState("");
  const { openDialog, handleOpenDialog, handleCloseDialog } =
    useFormDialog();

  const handleSelectedElement = (elements, elementId) => {
    setSelectedElement(elements.filter((element) => element.id === elementId));
  };

  const handleDialogClose = () => {
    handleCloseDialog();
    setActionType("");
  };

  const handleActionType = (actionType) => {
    setActionType(actionType);
    handleOpenDialog();
  };

  return {
    selectedElement,
    actionType,
    openDialog,
    setSelectedElement,
    handleSelectedElement,
    handleDialogClose,
    handleActionType,
  };
}
