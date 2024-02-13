import { useCalendar } from "@/hooks/useCalendar";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

function ClientBoosterDetailCalendar({ player }) {
  const { formatEvents } = useCalendar();

  const handleEventClick = (arg) => {
    if (arg.event.title === "Available") {
      console.log("display dialog");
    } else {
      console.log("NO display dialog");
    }
  };
  return (
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
  );
}

export default ClientBoosterDetailCalendar;
