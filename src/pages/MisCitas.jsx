import { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, useToast } from "@chakra-ui/react";
import AppointmentCard from "../components/AppointmentCard";
import EditAppointmentModal from "../components/EditAppointmentModal";
import { getFilteredAppointments, getMecanics } from "../utils/api";
import useAuthStore from "../store/authStore";
import { handleDelete, handleEditClick, handleUpdateAppointment } from "../utils/handlers/appointmentHandlers";


const MisCitas = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { user } = useAuthStore();
  const [mecanics, setMecanics] = useState([]);
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

    if (user) {
      loadAppointments();
      loadMecanics();
    }
  }, [user, toast]);

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Mis Citas
      </Heading>
      {appointments.length === 0 ? (
        <Text textAlign="center" fontSize="lg">
          No tienes citas programadas.
        </Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onDelete={handleDelete}
              onEdit={handleEditClick}
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
          onUpdate={handleUpdateAppointment}
        />
      )}
    </Box>
  );
};

export default MisCitas;