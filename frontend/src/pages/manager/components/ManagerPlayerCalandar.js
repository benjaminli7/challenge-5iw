import React from "react";
import { Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { usePlayerView } from "@/pages/player/hooks/usePlayerView";

function ManagerPlayerCalandar({ selectedUser, open, handleClose }) {
  const { setBackGroundColor, formatEvents } = usePlayerView();

  //   if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Typography variant="h5">
        Vue du calendrier du joueur {selectedUser.firstName}{" "}
        {selectedUser.lastName}
      </Typography>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView={"timeGridWeek"}
        editable={false}
        selectable={true}
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
        events={formatEvents(selectedUser.schedules)}
        slotDuration={"01:00:00"}
        slotLabelClassNames={{
          "fc-timegrid-slot": "p-6",
        }}
        eventStartEditable={false}
        selectOverlap={false}
      />
    </div>
  );
}

export default ManagerPlayerCalandar;
