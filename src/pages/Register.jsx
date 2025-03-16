import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, Text, Container } from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MotionBox from '../components/MotionBox';
import useRegisterHandlers from '../utils/handlers/registerHandlers';


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { handleChange, handleSubmit } = useRegisterHandlers(formData, setFormData, setIsLoading);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <MotionBox variants={containerVariants} initial="hidden" animate="visible">
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading size={{ base: 'xs', md: 'sm' }}>Crear una cuenta</Heading>
              <Text color="gray.500">
                ¿Ya tienes una cuenta?{' '}
                <RouterLink to="/login" style={{ color: 'blue.500' }}>
                  Inicia sesión
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg-surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl isRequired>
                    <FormLabel htmlFor="name">Nombre</FormLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Stack>
                <Button
                  type="submit"
                  colorScheme="red"
                  size="lg"
                  fontSize="md"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  Registrarse
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </MotionBox>
  );
}

export default Register;
