import useActionHandlers from "@/hooks/useActionHandlers";
import useFetch from "@/hooks/useFetch";
import PlayerAddEventForm from "@/pages/player/forms/PlayerAddEventForm";
import ENDPOINTS from "@/services/endpoints";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Dialog } from "@mui/material";
import { isAfter, isBefore } from "date-fns";
import { DateTime } from "luxon";
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import PlayerUpdateEventForm from "@/pages/player/forms/PlayerUpdateEventForm";

function PlayerView() {
  const auth = useAuthUser();

  const userId = auth().user.id;
  const { data: events, isLoading } = useFetch(
    "schedules",
    ENDPOINTS.users.schedules(userId)
  );
  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());
  const [selectedEventId, setSelectedEventId] = useState(null);
  const { actionType, openDialog, handleDialogClose, handleActionType } =
    useActionHandlers();
  if (isLoading) return <div>Loading...</div>;
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
    console.log(arg.event.start);
    console.log(arg.event.end);
    console.log(arg.event.id);
    setSelectedEventId(arg.event.id);
    handleActionType(ACTION_TYPES.UPDATE_EVENT);

  };
  return (
    <div>
      <h1>Player View</h1>
      <p>Player dashboard</p>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
        editable={true}
        selectable={true}
        select={handleTimeSelection}
        allDaySlot={false}
        locale="fr-FR"
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          scrollTime: "00:00",
          meridiem: false,
        }}
        contentHeight="auto"
        selectMirror={true}
        events={formatEvents(events)}
        eventClick={handleEventClick}
        selectAllow={(selectInfo) => {
          return isBefore(new Date(), selectInfo.start);
        }}
        slotDuration={"01:00:00"}
        slotLabelClassNames={{
          "fc-timegrid-slot": "p-6",
        }}
        eventStartEditable={false}
        selectOverlap={false}
      />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        {actionType === ACTION_TYPES.CREATE_EVENT && (
          <PlayerAddEventForm
            startingDate={startingDate}
            endingDate={endingDate}
            userId={userId}
            handleDialogClose={handleDialogClose}
          />
        )}
        {actionType === ACTION_TYPES.UPDATE_EVENT && (
          <PlayerUpdateEventForm
            selectedEventId={selectedEventId}
            startingDate={startingDate}
            endingDate={endingDate}
            handleDialogClose={handleDialogClose}
          />
        )}
      </Dialog>
    </div>
  );
}

export default PlayerView;
