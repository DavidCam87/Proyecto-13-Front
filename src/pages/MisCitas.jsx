import { useEffect, useState } from "react";
import { Box, Image, Heading, Text, VStack, useToast } from "@chakra-ui/react";
import AppointmentCard from "../components/AppointmentCard";
import EditAppointmentModal from "../components/EditAppointmentModal";
import { getFilteredAppointments, getMecanics, getServices } from "../utils/api";
import useAuthStore from "../store/authStore";
import { handleDelete, handleEditClick, handleUpdateAppointment } from "../utils/handlers/appointmentHandlers";

const MisCitas = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { user } = useAuthStore();
  const [mecanics, setMecanics] = useState([]);
  const [services, setServices] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const userId = user.id || user._id;
        const data = await getFilteredAppointments({ user: userId });
        setAppointments(data);
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

    const loadMecanics = async () => {
      try {
        const data = await getMecanics();
        setMecanics(data);
      } catch (error) {
        console.error("Error al cargar mecánicos:", error);
      }
    };

    const loadServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Error al cargar servicios:", error);
      }
    };

    if (user) {
      loadAppointments();
      loadMecanics();
      loadServices();
    }
  }, [user, toast]);

  const onDelete = async (appointmentId) => {
    await handleDelete(appointmentId, setAppointments, toast);
  };

  const onEdit = (appointment) => {
    handleEditClick(appointment, setEditingAppointment);
  };

  const onUpdate = async (id, formData) => {
    try {
      const updatedAppointment = await handleUpdateAppointment(id, formData, setAppointments, toast, setEditingAppointment);
      if (updatedAppointment) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment && appointment._id === updatedAppointment._id ? { ...updatedAppointment } : appointment
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
    }
  };

  return (
    <Box p={4} minH="70vh">
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Mis Citas
      </Heading>
      {appointments.length === 0 ? (
        <>
          <Text textAlign="center" fontSize="lg">
            No tienes citas programadas.
          </Text>
          <Box display="flex" justifyContent="center" alignItems={"center"} my={6}>
            <Image src="public/mecanico citas.png" alt="Mecanico citas" width="50%" borderRadius={"md"} />
          </Box>
        </>
      ) : (
        <VStack spacing={4} align="stretch">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onDelete={() => onDelete(appointment._id)}
              onEdit={() => onEdit(appointment)}
            />
          ))}
        </VStack>
      )}
      {editingAppointment && (
        <EditAppointmentModal
          isOpen={!!editingAppointment}
          onClose={() => setEditingAppointment(null)}
          appointment={editingAppointment}
          mecanics={mecanics}
          services={services}
          onUpdate={onUpdate}
        />
      )}
    </Box>
  );
};

export default MisCitas;