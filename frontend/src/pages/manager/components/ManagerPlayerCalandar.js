import React from "react";
import { Box, Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useCalendar } from "@/hooks/useCalendar";

function ManagerPlayerCalandar({ selectedUser }) {
  const { formatEvents } = useCalendar();
  return (
    <Box sx={{p: 4}}>
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
        weekends={false}
      />
    </Box>
  );
}

export default ManagerPlayerCalandar;
