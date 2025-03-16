import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, Text, useToast, Container, } from '@chakra-ui/react'
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuthHandlers } from '../utils/handlers/loginHandlers'
import MotionBox from '../components/MotionBox'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleSubmit } = useAuthHandlers();

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
              <Heading size={{ base: 'xs', md: 'sm' }}>Inicia sesión en tu cuenta</Heading>
              <Text color="gray.500">
                ¿No tienes una cuenta? <RouterLink to="/register" style={{ color: 'blue.500' }}>Regístrate</RouterLink>
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
            <form onSubmit={(e) => handleSubmit(e, email, password)}>
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </FormControl>
                </Stack>
                <Button type="submit" colorScheme="red" size="lg" fontSize="md" isDisabled={false}>
                  Iniciar Sesión
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </MotionBox>
  );
}

export default Login;