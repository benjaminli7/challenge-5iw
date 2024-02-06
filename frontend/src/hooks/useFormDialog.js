import { useState } from "react";

export default function useFormDialog(initialState = false) {
  const [openDialog, setOpen] = useState(initialState);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return {
    openDialog,
    setOpen,
    handleOpenDialog,
    handleCloseDialog,
  };
}
