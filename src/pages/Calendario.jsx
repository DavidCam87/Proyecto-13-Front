import { useState } from "react";
import { Box, Heading, Spinner, Flex } from "@chakra-ui/react";
import useAuthStore from "../store/authStore";
import useAppointments from "../hooks/useAppointments";
import useMessage from "../hooks/useMessage";
import Message from "../components/Message";
import AdminRestriction from "../components/AdminRestriction";
import CalendarComponent from "../components/CalendarComponent";
import AppointmentList from "../components/AppointmentList";

const Calendario = () => {
  const { isAdmin, user } = useAuthStore();
  const { appointments, loading } = useAppointments(user);
  const message = useMessage();
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!isAdmin) return <AdminRestriction />;

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Calendario de Citas
      </Heading>

      <Message
        message={message.message}
        type={message.messageType}
        clearMessage={message.clearMessage}
      />

      {loading ? (
        <Box textAlign="center">
          <Spinner size="xl" />
        </Box>
      ) : (
        <Flex direction="column" align="center">
          <CalendarComponent
            selectedDate={selectedDate}
            handleDateChange={setSelectedDate}
            appointments={appointments}
          />

          <AppointmentList
            selectedDate={selectedDate}
            appointments={appointments}
          />
        </Flex>
      )}
    </Box>
  );
};

export default Calendario;