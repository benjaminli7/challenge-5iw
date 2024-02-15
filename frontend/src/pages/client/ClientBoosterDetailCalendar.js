import useActionHandlers from "@/hooks/useActionHandlers";
import { useCalendar } from "@/hooks/useCalendar";
import AddReservationForm from "@/pages/client/forms/AddReservationForm";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Dialog } from "@mui/material";
import { DateTime } from "luxon";
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";

function ClientBoosterDetailCalendar({ player }) {
  const auth = useAuthUser();
  const user = auth().user;
  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());
  const [scheduleId, setScheduleId] = useState(null);
  const [coinsNeeded, setCoinsNeeded] = useState(0);

  const { formatEvents } = useCalendar();
  const { openDialog, handleDialogClose, handleOpenDialog } =
    useActionHandlers();

  const handleEventClick = (arg) => {
    if (arg.event.title === "Available") {
      const startingDateISO = arg.event.start.toISOString();
      const endingDateISO = arg.event.end.toISOString();
      let startingDate = DateTime.fromISO(startingDateISO, {
        zone: "Europe/Paris",
      });
      let endingDate = DateTime.fromISO(endingDateISO, {
        zone: "Europe/Paris",
      });
      setScheduleId(arg.event.id);
      setStartingDate(startingDate.toISO());
      setCoinsNeeded(arg.event.extendedProps.coinsNeeded);
      setEndingDate(endingDate.toISO());
      handleOpenDialog();
    }
  };
  console.log(player);

  return (
    <>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
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
        slotDuration={"01:00:00"}
        slotLabelClassNames={{
          "fc-timegrid-slot": "p-6",
        }}
        weekends={false}
      />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <AddReservationForm
          scheduleId={scheduleId}
          userId={user.id}
          startingDate={startingDate}
          endingDate={endingDate}
          handleDialogClose={handleDialogClose}
          coinsNeeded={coinsNeeded}
        />
      </Dialog>
    </>
  );
}

export default ClientBoosterDetailCalendar;
