import { Box } from "@chakra-ui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TileContent from "./TileContent";

const CalendarComponent = ({ selectedDate, handleDateChange, appointments }) => (
  <Box maxW="800px" mx="auto">
    <Calendar
      className="custom-calendar"
      onChange={handleDateChange}
      value={selectedDate}
      tileContent={({ date, view }) => (
        <TileContent date={date} view={view} appointments={appointments} />
      )}
    />
  </Box>
);

export default CalendarComponent;