import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, FormControl, FormLabel, Input, Select,
  Button, useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { updateAppointment } from "../utils/api";

const AppointmentModal = ({ isOpen, onClose, appointment, onUpdate, mecanics }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    date: appointment?.date || "",
    startTime: appointment?.startTime || "",
    mecanic: appointment?.mecanic?._id || "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    if (!formData.date || !formData.startTime || !formData.mecanic) {
      toast({
        title: "Error", description: "Todos los campos son obligatorios",
        status: "error", duration: 3000, isClosable: true,
      });
      return;
    }

    try {
      const updatedAppointment = await updateAppointment(appointment._id, formData);
      onUpdate(updatedAppointment);
      toast({ title: "Cita actualizada", status: "success", duration: 2000, isClosable: true });
      onClose();
    } catch (error) {
      toast({ title: "Error", description: "No se pudo actualizar la cita", status: "error", duration: 3000, isClosable: true });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Cita</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Fecha</FormLabel>
            <Input type="date" name="date" value={formData.date} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Hora</FormLabel>
            <Input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired mt={4}>
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
          <Button colorScheme="blue" onClick={handleUpdate}>Guardar Cambios</Button>
          <Button onClick={onClose} ml={3}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppointmentModal;
