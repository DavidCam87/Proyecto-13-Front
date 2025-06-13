// src/components/UserProfileForm.jsx
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { updateUser, deleteUser } from "../utils/apiUsers";

const UserProfileForm = ({ userData, onDelete, editable = true }) => {
  const [name, setName] = useState(userData.name || "");
  const [email, setEmail] = useState(userData.email || "");
  const toast = useToast();

  const handleUpdate = async () => {
    try {
      await updateUser(userData._id, { name, email });
      toast({
        title: "Perfil actualizado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Error al actualizar.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userData._id);
      toast({
        title: editable ? "Cuenta eliminada." : "Usuario eliminado.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      onDelete && onDelete(userData._id);
    } catch {
      toast({
        title: "Error al eliminar.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box boxShadow="md" p={6} borderRadius="lg">
      <VStack spacing={4} align="stretch">
        <FormControl isDisabled={!editable}>
          <FormLabel>Nombre</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
          />
        </FormControl>

        <FormControl isDisabled={!editable}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@ejemplo.com"
          />
        </FormControl>

        {editable && (
          <Button colorScheme="blue" onClick={handleUpdate}>
            Guardar cambios
          </Button>
        )}

        <Button colorScheme="red" onClick={handleDelete}>
          {editable ? "Eliminar cuenta" : "Eliminar usuario"}
        </Button>
      </VStack>
    </Box>
  );
};

export default UserProfileForm;
