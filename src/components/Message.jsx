import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

const Message = ({ message, type, clearMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearMessage();
    }, 3000); // Eliminar el mensaje después de 3 segundos

    return () => clearTimeout(timer);
  }, [message, clearMessage]);

  if (!message) return null;

  return (
    <Box
      className={type}
      p={4}
      borderRadius="md"
      mb={4}
      bg={type === "error" ? "red.500" : "green.500"}
      color="white"
      boxShadow="lg"
    >
      <Text>{message}</Text>
    </Box>
  );
};

export default Message;