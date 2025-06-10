import { Box, Heading } from "@chakra-ui/react";
import useAuthStore from "../store/authStore";
import UserProfileForm from "../components/UserProfileForm";

const PerfilPage = () => {
  const { user, logout } = useAuthStore();

  return (
    <Box maxW="lg" mx="auto" mt={10} >
      <Heading mb={6}>Mi Perfil</Heading>
      <UserProfileForm
        userData={user}
        token={user.token}
        onDelete={logout}
        editable={true}
      />
    </Box>
  );
};

export default PerfilPage;