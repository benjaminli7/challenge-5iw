import useActionHandlers from "@/hooks/useActionHandlers";
import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { isAfter } from "date-fns";
import { DateTime } from "luxon";
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";

export function usePlayerView() {
  const auth = useAuthUser();

  const user = auth().user;
  const { data: events, isLoading } = useFetch(
    "schedules",
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
  const setBackGroundColor = (event) => {
    if (isAfter(new Date(), event.end)) {
      return "gray";
    }
    return event.status === "available" ? "green" : "red";
  };
  const formatEvents = (events) => {
    return events?.map((event) => {
      return {
        id: event.id,
        title: event.status === "available" ? "Available" : "Booked",
        start: event.startingDate,
        end: event.endingDate,
        backgroundColor: setBackGroundColor(event),
      };
    });
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
    events,
    selectedEventId,
    actionType,
    openDialog,
    handleDialogClose,
    user,
    isLoading
  };
}
