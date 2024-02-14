import { useCustomMutation } from "@/hooks/useCustomMutation";
import ENDPOINTS from "@/services/endpoints";

export function useSchedule(scheduleId) {

  const addScheduleUserMutation = useCustomMutation(
    ENDPOINTS.schedules.root,
    "post",
    ["player"]
  );

  const deleteScheduleMutation = useCustomMutation(
    ENDPOINTS.schedules.scheduleId(scheduleId),
    "delete",
    ["player"]
  );

  return {
    addScheduleUserMutation,
    deleteScheduleMutation,
  };
}
