import { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

const EditAppointmentModal = ({ isOpen, onClose, appointment, mecanics, onUpdate }) => {
  const [formData, setFormData] = useState({
    date: appointment.date,
    time: appointment.time,
    mecanic: appointment.mecanic?._id || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(appointment._id, formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Cita</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Fecha</FormLabel>
            <Input type="date" name="date" value={formData.date} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Hora</FormLabel>
            <Input type="time" name="time" value={formData.time} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Mecánico</FormLabel>
            <Select name="mecanic" value={formData.mecanic} onChange={handleChange}>
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
