import { Container, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NoServiceSelected = () => (
  <Container maxW="7xl" py={10}>
    <Text>Por favor, seleccione uno de nuestros servicios</Text>
    <Button as={RouterLink} to="/services" colorScheme="red" mt={4}>
      Ir a Servicios
    </Button>
  </Container>
);

export default NoServiceSelected;