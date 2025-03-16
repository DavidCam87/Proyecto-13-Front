import { useToast } from "@chakra-ui/react";
import { deleteAppointment, updateAppointment } from "../api";

export const handleDelete = async (appointmentId, setAppointments, toast) => {
  try {
    await deleteAppointment(appointmentId);
    setAppointments((prev) => prev.filter((a) => a._id !== appointmentId));
    toast({
      title: "Cita eliminada con éxito",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Error al eliminar la cita",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};

export const handleEditClick = (appointment, setEditingAppointment) => {
  setEditingAppointment(appointment);
};

export const handleUpdateAppointment = async (
  id,
  formData,
  setAppointments,
  toast,
  setEditingAppointment
) => {
  try {
    const updatedAppointment = await updateAppointment(id, formData);
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? updatedAppointment : a))
    );
    toast({
      title: "Cita actualizada con éxito",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setEditingAppointment(null);
  } catch (error) {
    toast({
      title: "Error",
      description: "No se pudo actualizar la cita",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};