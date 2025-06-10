import { Box, Container, Heading, FormControl, FormLabel, Select, Button, Stack, Text, Input, } from '@chakra-ui/react';

const AppointmentForm = ({
  selectedService,
  mechanics,
  isLoading,
  formData,
  handleChange,
  handleStartTimeChange,
  handleSubmit,
  startTimeOptions,
}) => (
  <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
    <Stack spacing="8">
      <Stack spacing="6" textAlign="center">
        <Heading size={{ base: 'xs', md: 'sm' }}>Crear Nueva Cita</Heading>
        <Text color="gray.600">Citar Para: {selectedService.name}</Text>
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
            <FormControl isRequired>
              <FormLabel>Fecha</FormLabel>
              <Input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Hora</FormLabel>
              <Select
                name="startTime"
                value={formData.startTime}
                onChange={handleStartTimeChange}
              >
                {startTimeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Mecánico</FormLabel>
              <Select
                name="mecanic"
                value={formData.mecanic}
                onChange={handleChange}
                placeholder="Select mechanic"
              >
                {mechanics.map((mechanic) => (
                  <option key={mechanic._id} value={mechanic._id}>
                    {mechanic.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              colorScheme="red"
              size="lg"
              fontSize="md"
              isLoading={isLoading}
            >
              Crear Cita
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  </Container>
);

export default AppointmentForm;