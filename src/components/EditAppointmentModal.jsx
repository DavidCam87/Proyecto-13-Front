import { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Select, useToast } from "@chakra-ui/react";

const EditAppointmentModal = ({ isOpen, onClose, appointment, mecanics, services, onUpdate }) => {
  const [formData, setFormData] = useState({
    service: appointment.service?._id || "",
    date: appointment.date,
    startTime: appointment.startTime,
    mecanic: appointment.mecanic?._id || "",
  });
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.startTime || !formData.mecanic || !formData.service) {
      toast({ title: "Error", description: "Todos los campos son obligatorios", status: "error", duration: 3000, isClosable: true });
      return;
    }
    onUpdate(appointment._id, formData);
    onClose();

  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Cita</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Servicio</FormLabel>
            <Select name="service" value={formData.service} onChange={handleChange} aria-label="Servicio asignado">
              <option value="">Selecciona un Servicio</option>
              {services.map((serv) => (
                <option key={serv._id} value={serv._id}>{serv.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Fecha</FormLabel>
            <Input type="date" name="date" value={formData.date} onChange={handleChange} aria-label="Fecha de la cita" />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Hora</FormLabel>
            <Input type="time" name="startTime" value={formData.startTime} onChange={handleChange} aria-label="Hora de la cita" />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Mecánico</FormLabel>
            <Select name="mecanic" value={formData.mecanic} onChange={handleChange} aria-label="Mecánico asignado">
              <option value="">Selecciona un mecánico</option>
              {mecanics.map((mec) => (
                <option key={mec._id} value={mec._id}>{mec.name}</option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Guardar Cambios
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditAppointmentModal;