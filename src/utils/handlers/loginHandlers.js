import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

export const useAuthHandlers = () => {
  const { login, error } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Por favor, ingrese un email y una contraseña.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      await login({ email, password });
      navigate("/");
      toast({
        title: "Login correcto",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: error || "Ocurrió un error durante el login",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return { handleSubmit };
};