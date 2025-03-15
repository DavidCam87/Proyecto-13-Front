import { VStack, Text } from "@chakra-ui/react";

const parseAppointmentDate = (dateStr) => {
  if (dateStr.includes("-")) return new Date(dateStr);
  if (dateStr.includes("/")) {
    const [day, month, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
  }
  return new Date(dateStr);
};

const getAppointmentsForDate = (appointments, date) => {
  return appointments
    .filter((app) => {
      const appDate = parseAppointmentDate(app.date);
      return appDate.toDateString() === date.toDateString();
    })
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
};
const TileContent = ({ date, view, appointments }) => {
  if (view !== "month") return null;

  const dayApps = getAppointmentsForDate(appointments, date);
  if (dayApps.length === 0) return null;

  return (
    <VStack spacing={1} position="static" flexDir="row" justify="center">
      {dayApps.map((app) => (
        <Text key={app._id} fontSize="xs">
          🔴
        </Text>
      ))}
    </VStack>
  );
};

export default TileContent;