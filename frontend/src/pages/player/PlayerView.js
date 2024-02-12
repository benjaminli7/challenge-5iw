import PlayerAddEventForm from "@/pages/player/forms/PlayerAddEventForm";
import PlayerUpdateEventForm from "@/pages/player/forms/PlayerUpdateEventForm";
import { usePlayerView } from "@/pages/player/hooks/usePlayerView";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Dialog, Typography } from "@mui/material";
import { isBefore } from "date-fns";

function PlayerView() {
  const {
    handleEventClick,
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
    formatEvents,
    isLoading,
  } = usePlayerView();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Typography variant="h3">Bienvenue {user.username}!</Typography>
      <Typography variant="h5">Voici vos prochaines sessions</Typography>
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
            userId={user.id}
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
