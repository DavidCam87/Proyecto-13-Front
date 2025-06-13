import {
  Box, Container, Heading, SimpleGrid, Text, Button, Stack, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
  Center,
} from "@chakra-ui/react";
import MotionBox from "../components/MotionBox";
import useServicesHandlers from "../utils/handlers/servicesHandlers";
import ServiceCard from "../components/ServiceCard";

function Services() {
  const {
    services,
    isLoading,
    handleServiceSelect,
    openModal,
    closeModal,
    selectedServiceDetails,
    isModalOpen,
  } = useServicesHandlers();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (isLoading) {
    return (
      <Container maxW="7xl" py={20}>
        <Center>
          <Spinner size="xl" label="Cargando servicios…" />
        </Center>
      </Container>
    );
  }

  return (
    <MotionBox variants={containerVariants} initial="hidden" animate="visible">
      <Container maxW="7xl" py={10}>
        <Stack spacing={8}>
          <Box textAlign="center">
            <Heading size="xl" mb={4}>
              Nuestros Servicios
            </Heading>
            <Text color="gray.600">
              Elija entre nuestra gama de servicios profesionales para motocicletas.
            </Text>
          </Box>

          {services.length === 0 ? (
            <Center py={10}>
              <Text fontSize="lg">No hay servicios disponibles en este momento.</Text>
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {services.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onSelect={handleServiceSelect}
                  onViewDetails={openModal}
                />
              ))}
            </SimpleGrid>
          )}
        </Stack>
        {selectedServiceDetails && (
          <Modal isOpen={isModalOpen} onClose={closeModal} isCentered size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedServiceDetails.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text mb={4}>
                  {selectedServiceDetails.details ||
                    selectedServiceDetails.description ||
                    "Detalles disponibles próximamente."}
                </Text>
                {selectedServiceDetails.duration && (
                  <Text mb={2}>
                    <strong>Duración:</strong> {selectedServiceDetails.duration}
                  </Text>
                )}
                {selectedServiceDetails.included && (
                  <Text>
                    <strong>Incluye:</strong> {selectedServiceDetails.included}
                  </Text>
                )}
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={closeModal}>
                  Cerrar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </MotionBox>
  );
}

export default Services;