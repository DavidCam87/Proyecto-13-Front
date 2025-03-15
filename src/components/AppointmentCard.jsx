import { Box, Heading, Text, HStack, Button } from "@chakra-ui/react";

const AppointmentCard = ({ appointment, onDelete, onEdit }) => (
  <Box borderWidth="1px" borderRadius="md" p={4}>
    <Heading size="sm">{appointment.service.name}</Heading>
    <Text>Fecha: {appointment.date}</Text>
    <Text>Hora: {appointment.startTime}</Text>
    <Text>Mecánico: {appointment.mecanic.name}</Text>
    <HStack spacing={4} mt={2}>
      <Button colorScheme="red" onClick={() => onDelete(appointment._id)}>
        Eliminar
      </Button>
      <Button colorScheme="blue" onClick={() => onEdit(appointment)}>
        Editar
      </Button>
    </HStack>
  </Box>
);

export default AppointmentCard;
