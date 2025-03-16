import { Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { parseISO, format } from 'date-fns'; // Importar date-fns

const parseAppointmentDate = (dateStr) => {
  return parseISO(dateStr); // Usar date-fns para parsear fechas
};

const getAppointmentsForDate = (appointments, date) => {
  return appointments
    .filter((app) => {
      const appDate = parseAppointmentDate(app.date);
      return format(appDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'); // Usar date-fns para comparar fechas
    })
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
};

const TileContent = ({ date, view, appointments }) => {
  if (view !== "month") return null;

  const dayApps = getAppointmentsForDate(appointments, date);
  if (dayApps.length === 0) return null;

  return (
    <UnorderedList spacing={1} position="static" styleType="none" m={0} p={0}>
      {dayApps.map((app) => (
        <ListItem key={app._id} fontSize="xs" aria-label="Cita programada">
          <Text as="span" color="red.500">
            ●
          </Text>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default TileContent;