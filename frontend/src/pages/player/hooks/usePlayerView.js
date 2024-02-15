import useActionHandlers from "@/hooks/useActionHandlers";
import { useCalendar } from "@/hooks/useCalendar";
import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { isAfter } from "date-fns";
import { DateTime } from "luxon";
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";

export function usePlayerView() {
  const auth = useAuthUser();

  const {
    formatEvents,
  } = useCalendar();

  const user = auth().user;
  const { data: player, isLoading } = useFetch(
    "player",
    ENDPOINTS.users.schedules(user.id)
  );
  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());
  const [selectedEventId, setSelectedEventId] = useState(null);
  const { actionType, openDialog, handleDialogClose, handleActionType } =
    useActionHandlers();
  const ACTION_TYPES = {
    CREATE_EVENT: "CREATE_EVENT",
    UPDATE_EVENT: "UPDATE_EVENT",
  };
  const handleTimeSelection = (arg) => {
    const startingDateISO = arg.start.toISOString();
    const endingDateISO = arg.end.toISOString();
    let startingDate = DateTime.fromISO(startingDateISO, {
      zone: "Europe/Paris",
    });
    let endingDate = DateTime.fromISO(endingDateISO, { zone: "Europe/Paris" });

    setStartingDate(startingDate.toISO());
    setEndingDate(endingDate.toISO());

    handleActionType(ACTION_TYPES.CREATE_EVENT);
  };

  const handleEventClick = (arg) => {
    setSelectedEventId(arg.event.id);
    handleActionType(ACTION_TYPES.UPDATE_EVENT);
  };

  return {
    handleEventClick,
    formatEvents,
    handleTimeSelection,
    ACTION_TYPES,
    startingDate,
    endingDate,
    selectedEventId,
    actionType,
    openDialog,
    handleDialogClose,
    isLoading,
    player
  };
}
