import { useSchedule } from "@/hooks/models/useSchedule";
import { toast } from "sonner";
import PlayerEventForm from "@/pages/player/forms/PlayerEventForm";

function PlayerAddEventForm({
  startingDate,
  endingDate,
  userId,
  handleDialogClose,
}) {
  const { addScheduleUserMutation } = useSchedule();

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        booster: `api/users/${userId}`,
      };
      await addScheduleUserMutation.mutateAsync(dataToSend);
      await handleDialogClose();
      toast.success("Event created successfully");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Error creating event");
    }
  };


  return (
    <PlayerEventForm onSubmit={onSubmit} actionType="create" startingDate={startingDate} endingDate={endingDate} />
  );
}

export default PlayerAddEventForm;
