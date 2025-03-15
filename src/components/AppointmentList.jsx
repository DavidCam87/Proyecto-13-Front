import { Box, Heading, Text, VStack } from "@chakra-ui/react";
export const parseAppointmentDate = (dateStr) => {
  if (dateStr.includes("-")) return new Date(dateStr);
  if (dateStr.includes("/")) {
    const [day, month, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
  }
  return new Date(dateStr);
};

export const getAppointmentsForDate = (appointments, date) => {
  return appointments
    .filter((app) => {
      const appDate = parseAppointmentDate(app.date);
      return appDate.toDateString() === date.toDateString();
    })
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
};

const AppointmentList = ({ selectedDate, appointments }) => {
  const filteredApps = getAppointmentsForDate(appointments, selectedDate);

  return (
    <Box mt={6} w={"100%"} bg="white" p={4} borderRadius="md" textAlign={"center"}>
      <Heading size="md">
        Citas para {selectedDate.toDateString()}
      </Heading>
      {filteredApps.length === 0 ? (
        <Text>No hay citas para este día.</Text>
      ) : (
        <VStack spacing={4} align="stretch" mt={2}>
          {filteredApps.map((app) => (
            <Box key={app._id} p={3} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">Servicio: {app.service.name}</Text>
              <Text>Hora: {app.startTime} - {app.endTime}</Text>
              <Text>Usuario: {app.user.name}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default AppointmentList;