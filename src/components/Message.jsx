import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

const Message = ({ message, type, clearMessage, duration = 3000 }) => { // Duración configurable
  useEffect(() => {
    const timer = setTimeout(() => {
      clearMessage();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, clearMessage, duration]);

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
      aria-live="polite" // Agregado aria-live
      aria-atomic="true" // Agregado aria-atomic
      transition="opacity 0.3s ease-in-out" // Transición de opacidad
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Text>{message}</Text>
    </Box>
  );
};

export default Message;