// src/components/adminComponents/AdminUsers.jsx
import { Box, Heading, Text, VStack, HStack, Button } from '@chakra-ui/react';

const AdminUsers = ({ users, onEdit, onDelete }) => {
  return (
    <>
      {users.length === 0 ? (
        <Text>No hay usuarios registrados</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {users.map((user) => (
            <Box key={user._id} p={3} borderWidth="1px" borderRadius="md">
              <Heading size="sm">{user.name}</Heading>
              <Text>Email: {user.email}</Text>
              <Text>Rol: {user.role}</Text>
              <HStack mt={2}>
                <Button colorScheme="blue" onClick={() => onEdit(user)}>
                  Editar
                </Button>
                <Button colorScheme="red" onClick={() => onDelete(user._id)}>
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

export default AdminUsers;
