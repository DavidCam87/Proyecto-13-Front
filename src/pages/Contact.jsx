import React, { useState } from 'react';
import { Box, Container, Heading, Text, FormControl, FormLabel, Input, Textarea, Button, VStack, HStack, useToast } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { FaWhatsapp } from 'react-icons/fa';
import { handleChange, handleSubmit, handleWhatsApp } from '../utils/handlers/contactHandlers';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const toast = useToast();

  const handleSubmitWithToast = (e) => {
    handleSubmit(e, formData, toast);
  };

  const handleWhatsAppWithToast = () => {
    handleWhatsApp(toast);
  };

  return (
    <Container maxW="container.md" py={20}>
      <Box textAlign="center" mb={12}>
        <Heading as="h1" size="2xl" color="red.500">Contáctanos</Heading>
        <Text fontSize="lg" color="gray.600">
          Si tienes alguna duda o necesitas más información, envíanos un mensaje o inicia una conversación por WhatsApp.
        </Text>
      </Box>
      <Box
        bg="whiteAlpha.900"
        p={8}
        borderRadius="2xl"
        boxShadow="xl"
        border="1px solid"
        borderColor="red.100"
      >
        <form onSubmit={handleSubmitWithToast}>
          <VStack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                name="name"
                placeholder="Tu nombre"
                borderColor="gray.300"
                _focus={{ borderColor: "red.400", boxShadow: "0 0 0 1px #E53E3E" }}
                value={formData.name}
                onChange={(e) => handleChange(e, setFormData, formData)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="Tu email"
                borderColor="gray.300"
                _focus={{ borderColor: "red.400", boxShadow: "0 0 0 1px #E53E3E" }}
                value={formData.email}
                onChange={(e) => handleChange(e, setFormData, formData)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Asunto</FormLabel>
              <Input
                name="subject"
                placeholder="Asunto"
                borderColor="gray.300"
                _focus={{ borderColor: "red.400", boxShadow: "0 0 0 1px #E53E3E" }}
                value={formData.subject}
                onChange={(e) => handleChange(e, setFormData, formData)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Mensaje</FormLabel>
              <Textarea
                name="message"
                placeholder="Tu mensaje"
                borderColor="gray.300"
                _focus={{ borderColor: "red.400", boxShadow: "0 0 0 1px #E53E3E" }}
                value={formData.message}
                onChange={(e) => handleChange(e, setFormData, formData)}
                resize="vertical"
              />
            </FormControl>
            <HStack spacing={4} justify="center">
              <Button colorScheme="blue" type="submit" _hover={{ transform: "scale(1.02)" }} leftIcon={<EmailIcon />}>
                Enviar Email
              </Button>
              <Button colorScheme="green" onClick={handleWhatsAppWithToast} _hover={{ transform: "scale(1.02)" }} leftIcon={<FaWhatsapp />}>
                WhatsApp
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default Contact;