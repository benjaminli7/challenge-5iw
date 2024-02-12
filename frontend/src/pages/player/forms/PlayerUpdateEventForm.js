import React from 'react'
import { useSchedule } from '@/hooks/models/useSchedule';
import { toast } from 'sonner';
import PlayerEventForm from '@/pages/player/forms/PlayerEventForm';

function PlayerUpdateEventForm({ selectedEventId, startingDate, endingDate, handleDialogClose }) {
  const { deleteScheduleMutation } = useSchedule(selectedEventId);

  const onSubmit = async (data) => {};

  const handleDeleteSchedule = async () => {
    try {
      await deleteScheduleMutation.mutateAsync();
      await handleDialogClose();
      toast.success("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Error deleting event");
    }
  };

  return (
    <PlayerEventForm
      onSubmit={onSubmit}
      actionType="update"
      startingDate={startingDate}
      endingDate={endingDate}
      deleteScheduleMutation={deleteScheduleMutation}
      handleDeleteSchedule={handleDeleteSchedule}
    />
  );
}

export default PlayerUpdateEventForm