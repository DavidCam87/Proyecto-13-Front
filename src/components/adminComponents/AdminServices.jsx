// src/components/adminComponents/AdminServices.jsx
import { Box, Heading, Text, VStack, HStack, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const AdminServices = ({ services, newService, setNewService, onAdd, onEdit, onDelete }) => {
  return (
    <>
      <FormControl mb={4}>
        <FormLabel>Agregar Servicio</FormLabel>
        <Input
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          placeholder="Nombre del servicio"
        />
        <Input
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          placeholder="Descripción del servicio"
          mt={2}
        />
        <Button colorScheme="green" onClick={onAdd} mt={2}>
          Agregar
        </Button>
      </FormControl>
      {services.length === 0 ? (
        <Text>No hay servicios registrados</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {services.map((service) => (
            <Box key={service._id} p={3} borderWidth="1px" borderRadius="md">
              <Heading size="sm">{service.name}</Heading>
              <Text>{service.description}</Text>
              <HStack mt={2}>
                <Button colorScheme="blue" onClick={() => onEdit(service)}>
                  Editar
                </Button>
                <Button colorScheme="red" onClick={() => onDelete(service._id)}>
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

export default AdminServices;
