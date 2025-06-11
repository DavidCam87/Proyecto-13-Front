import { Box, Heading, Text, VStack, HStack, Button } from '@chakra-ui/react';

const AdminAppointments = ({ appointments, onEdit, onDelete }) => {
  return (
    <>
      {appointments.length === 0 ? (
        <Text>No hay citas registradas</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {appointments.map((app) => (
            <Box key={app._id} p={3} borderWidth="1px" borderRadius="md">
              <Heading size="sm">
                {app.service?.name ?? 'Servicio No Asignado'}
              </Heading>
              <Text>Cliente: {app.user?.name ?? 'Cliente No Registrado'}</Text>
              <Text>
                Fecha:{' '}
                {app.date
                  ? new Date(app.date).toLocaleDateString()
                  : 'Fecha No Disponible'}
              </Text>
              <Text>
                Hora:{' '}
                {app.startTime ?? 'Hora No Disponible'}
              </Text>
              <Text>
                Mecánico: {app.mecanic?.name ?? 'Mecánico No Asignado'}
              </Text>
              <HStack mt={2}>
                <Button colorScheme="blue" onClick={() => onEdit(app)}>
                  Editar
                </Button>
                <Button colorScheme="red" onClick={() => onDelete(app._id)}>
                  Eliminar
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </>
  );
};

export default AdminAppointments;