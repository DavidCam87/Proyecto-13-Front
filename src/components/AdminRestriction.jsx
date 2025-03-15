import { Box, Heading, Text } from "@chakra-ui/react";

const AdminRestriction = () => (
  <Box textAlign="center" mt={10}>
    <Heading as="h1" size="xl">
      Acceso restringido
    </Heading>
    <Text mt={4}>Solo los administradores pueden acceder a esta página.</Text>
  </Box>
);

export default AdminRestriction;