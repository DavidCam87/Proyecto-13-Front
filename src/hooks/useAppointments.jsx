import { useState, useEffect } from "react";
import { getAllAppointmentsAdmin, deleteAppointment, updateAppointment } from "../utils/api";
import { useToast } from "@chakra-ui/react";

const useAppointments = (user) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const apps = await getAllAppointmentsAdmin({ user: user.id || user._id });
        setAppointments(apps);
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar las citas",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [user._id || user.id, toast]);

  const handleDelete = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId);
      setAppointments(prev => prev.filter(a => a._id !== appointmentId));
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

  const handleUpdate = async (appointmentId, updates) => {
    try {
      const updated = await updateAppointment(appointmentId, updates);
      setAppointments(prev =>
        prev.map(a => a._id === appointmentId ? updated : a)
      );
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la cita",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
  };


  return { appointments, loading, handleDelete, handleUpdate };
};

export default useAppointments;