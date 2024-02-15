import PlayerAddEventForm from "@/pages/player/forms/PlayerAddEventForm";
import PlayerUpdateEventForm from "@/pages/player/forms/PlayerUpdateEventForm";
import { usePlayerView } from "@/pages/player/hooks/usePlayerView";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Dialog, Typography, Paper, Stack } from "@mui/material";
import { isBefore } from "date-fns";
import PlayerReservationItem from "./PlayerReservationItem";
import Loader from "@/components/commons/Loader";

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
    player,
    formatEvents,
    isLoading,
  } = usePlayerView();

  if (isLoading) return <Loader />

  const upcomingEvents = player.schedules.filter((event) => {
    if(event.status === "booked") {
      return isBefore(new Date(), new Date(event.startingDate));
    }
  });

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Welcome {player.username}!</Typography>
      <Typography variant="subtitle">
        You made {player.coin_generated} coins for your team!
      </Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Your incoming sessions
        </Typography>
        {upcomingEvents.length === 0 && (
          <Typography>You have no upcoming sessions</Typography>
        )}
        {upcomingEvents.map((schedule, index) => (
          <PlayerReservationItem schedule={schedule} key={index} />
        ))}
      </Paper>
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
        events={formatEvents(player.schedules)}
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
        weekends={false}
      />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        {actionType === ACTION_TYPES.CREATE_EVENT && (
          <PlayerAddEventForm
            startingDate={startingDate}
            endingDate={endingDate}
            userId={player.id}
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
    </Stack>
  );
}

export default PlayerView;
