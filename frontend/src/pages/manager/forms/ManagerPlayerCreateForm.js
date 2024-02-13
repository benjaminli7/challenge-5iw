import React, { useState } from "react";
import ManagerPlayerForm from "@/pages/manager/forms/ManagerPlayerForm";
import { useTeams } from "@/hooks/models/useTeams";
import { toast } from "sonner";

function ManagerPlayerCreateForm({ team, handleDialogClose, games }) {
  const { addPlayerMutation } = useTeams(team.id);
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        lat: latLng.lat,
        lng: latLng.lng,
      };
      // console.log(dataToSend)
      await addPlayerMutation.mutateAsync(dataToSend);
      await handleDialogClose();
      toast.success("Player added to team!");
    } catch (error) {
      console.error("Error creating player:", error);
      toast.error("Error creating player");
    }
  };
  return (
    <ManagerPlayerForm
      setLatLng={setLatLng}
      latLng={latLng}
      onSubmit={onSubmit}
      actionType="create"
      games={games}
    />
  );
}

export default ManagerPlayerCreateForm;
