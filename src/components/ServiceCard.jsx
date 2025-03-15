import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";

function ServiceCard({ service, onSelect, onViewDetails }) {
  return (
    <Box
      display={'flex'}
      textAlign="center"
      boxShadow="md"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={8}
      h="370px"
      bg="white"
      _hover={{ transform: 'translateY(-5px)', transition: 'all 0.2s' }}
    >
      <Stack spacing={3} flex={1}>
        <Heading size="md">{service.name}</Heading>
        <Text>{service.description}</Text>
        <HStack spacing={4} mt="auto">
          <Button
            w="100%"
            onClick={() => onSelect(service)}
            colorScheme="red"
            variant="outline"
          >
            Coger Cita
          </Button>
          <Button
            w="100%"
            onClick={() => onViewDetails(service)}
            colorScheme="blue"
            variant="outline"
          >
            Ver Detalles
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}

export default ServiceCard;