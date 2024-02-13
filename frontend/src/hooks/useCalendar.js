import { isAfter } from "date-fns";

export function useCalendar() {
  const setBackGroundColor = (event) => {
    if (isAfter(new Date(), event.endingDate)) {
      return "gray";
    }
    return event.status === "available" ? "green" : "red";
  };

  const returnEventStatus = (event) => {
    if (isAfter(new Date(), event.endingDate)) {
      return "Expired";
    }
    return event.status === "available" ? "Available" : "Booked";
  }

  const formatEvents = (events) => {
    return events?.map((event) => {
      return {
        id: event.id,
        title: returnEventStatus(event),
        start: event.startingDate,
        end: event.endingDate,
        backgroundColor: setBackGroundColor(event),
      };
    });
  };
  return {
    formatEvents,
    setBackGroundColor,
  };
}
