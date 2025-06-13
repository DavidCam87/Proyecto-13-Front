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
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUser } from "../utils/apiUsers";
import useAuthStore from "../store/authStore";

const UserProfileForm = ({ userData, onDelete, editable = true }) => {
  const [name, setName] = useState(userData.name || "");
  const [email, setEmail] = useState(userData.email || "");
  const toast = useToast();
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      const response = await updateUser(userData._id, { name, email });
      const updated = response.data;        // obtenemos los datos frescos
      setUser(updated);                     // actualizamos el store y localStorage
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
      onDelete && onDelete();
      navigate("/");
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
