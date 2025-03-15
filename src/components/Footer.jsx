import { Box, Container, Stack, Text, SimpleGrid, Link, HStack, IconButton, Heading } from '@chakra-ui/react';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaFacebookSquare } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box bg="gray.900" color="white" py={16} mt={20} position={"sticky"}>
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={12}>
          <Stack spacing={4}>
            <Heading size="md">Contacto</Heading>
            <HStack as="a"
              href="https://maps.app.goo.gl/EkNQ3zbJi91q5ogx8"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{ textDecoration: 'underline' }}><FaMapMarkerAlt /> <Text>C/Alfonso XI, Gran Plaza, 5, 41005 Sevilla</Text></HStack>
            <HStack><FaPhone /> <Link href="tel:+34123456789">+34 635 259 873</Link></HStack>
          </Stack>

          <Stack spacing={4}>
            <Heading size="md">Enlaces Rápidos</Heading>
            <Link as={RouterLink} to="/services" _hover={{ color: "red.400" }}>Servicios</Link>
            <Link as={RouterLink} to="/contact" _hover={{ color: "red.400" }}>Contacto</Link>
          </Stack>

          <Stack spacing={4}>
            <Heading size="md">Redes Sociales</Heading>
            <HStack spacing={4}>
              <IconButton
                color={"white"}
                aria-label="Instagram"
                icon={<FaInstagram />}
                variant="ghost"
                fontSize="24px"
                _hover={{ color: "red.400" }}
              />
              <IconButton
                color={"white"}
                aria-label="WhatsApp"
                icon={<FaWhatsapp />}
                variant="ghost"
                fontSize="24px"
                _hover={{ color: "red.400" }}
              />
              <IconButton
                color={"white"}
                aria-label="Facebook"
                icon={<FaFacebookSquare />}
                variant="ghost"
                fontSize="24px"
                _hover={{ color: "red.400" }}
              />
            </HStack>
          </Stack>
        </SimpleGrid>
        <Text textAlign="center" pt={8} borderTop="1px" borderColor="whiteAlpha.200">
          © 2025 Tic Tac Motos. Todos los derechos reservados
        </Text>
        <Text textAlign="center">
          Desarrollado y Diseñado por David Camuñez
        </Text>
      </Container>
    </Box>
  )
}

export default Footer