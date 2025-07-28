import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Spinner, Center, Alert, AlertIcon } from "@chakra-ui/react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, error } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error al cargar la autenticación.
      </Alert>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;