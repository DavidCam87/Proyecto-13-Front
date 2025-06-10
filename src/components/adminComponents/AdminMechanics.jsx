import { Box, Heading, Text, VStack, HStack, Button, FormControl, FormLabel, Input, HStack as ChakraHStack } from '@chakra-ui/react';

const AdminMechanics = ({ mechanics, newMecanic, setNewMecanic, onAdd, onEdit, onDelete }) => {
  return (
    <>
      <FormControl mb={4}>
        <FormLabel>Agregar Mecánico</FormLabel>
        <ChakraHStack spacing={4}>
          <Input
            value={newMecanic}
            onChange={(e) => setNewMecanic(e.target.value)}
            placeholder="Nuevo mecánico"
          />
          <Button colorScheme="green" onClick={onAdd}>
            Agregar
          </Button>
        </ChakraHStack>
      </FormControl>
      {mechanics.length === 0 ? (
        <Text>No hay mecánicos registrados</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {mechanics.map((mec) => (
            <Box key={mec._id} p={3} borderWidth="1px" borderRadius="md">
              <Heading size="sm">{mec.name}</Heading>
              <HStack mt={2}>
                <Button colorScheme="blue" onClick={() => onEdit(mec)}>
                  Editar
                </Button>
                <Button colorScheme="red" onClick={() => onDelete(mec._id)}>
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

export default AdminMechanics;